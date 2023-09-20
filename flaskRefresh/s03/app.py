from flask import Flask, request
from flask_smorest import abort
import db
import uuid


app = Flask(__name__)


@app.get("/store")
def get_all_stores():
    return {"stores": list(db.stores.values())}


@app.get("/store/<string:store_id>")
def get_store_info(store_id):
    try:
        return db.stores[store_id], 200
    except KeyError:
        abort(404, message="No such store found")


@app.post("/store")
def add_store():
    data = request.get_json()

    if "name" not in data:
        abort(400, message="Bad request. Missing: 'name'")
    found = list(filter(lambda s: s['name'] == data['name'], db.stores.values()))
    if found:
        abort(400, message="Store already exists.")

    store_id = uuid.uuid4().hex
    new_store = {**data, "id": store_id}
    db.stores[store_id] = new_store

    return new_store, 201


@app.put("/store/<string:store_id>")
def update_store(store_id):
    data = request.get_json()
    if "name" not in data:
        abort(400, message="Bad request. Missing required fields: 'name'")

    try:
        db.stores[store_id]['name'] = data['name']
        return db.stores[store_id]
    except KeyError:
        abort(404, message="Store not found.")


@app.delete("/store/<string:store_id>")
def delete_store(store_id):
    try:
        del db.stores[store_id]
    except KeyError:
        pass

    return {"messages": f"Stores with id {store_id} removed."}, 200


@app.get("/item/<string:item_id>")
def get_item(item_id):
    try:
        return db.items[item_id], 200
    except KeyError:
        abort(404, message="No such item found")


@app.get("/item")
def get_all_items():
    return {"items": list(db.items.values())}, 200


@app.post("/item")
def add_item():
    data = request.get_json()
    if data['store_id'] not in db.stores:
        abort(404, message="No such store found")
    for field in ("price", "store_id", "name"):
        if field not in data:
            abort(400, message="Bad request. Required fields: 'price', 'store_id', 'name'")

    for item in db.items.values():
        if item['name'] == data['name'] and item['store_id'] == data['store_id']:
            abort(400, message="Item already exists.")

    item_id = uuid.uuid4().hex
    new_item = {**data, "id": item_id}
    db.items[item_id] = new_item

    return new_item, 201


@app.put("/item/<string:item_id>")
def update_item(item_id):
    data = request.get_json()
    if "price" not in data or "name" not in data:
        abort(400, message="Bad request. Missing required fields: 'price' or 'name'")

    try:
        db.items[item_id].update({
            "name": data["name"],
            "price": data["price"]
        })
        return db.items[item_id]
    except KeyError:
        abort(404, message="Item not found.")


@app.delete("/item/<string:item_id>")
def delete_item(item_id):
    try:
        del db.items[item_id]
    except KeyError:
        pass

    return {"messages": f"Items with id {item_id} removed."}, 200
