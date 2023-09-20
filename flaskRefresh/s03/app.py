from flask import Flask, request
import db
import uuid


app = Flask(__name__)


@app.get("/store")
def get_stores():
    return {"stores": list(db.stores.values())}


@app.post("/store")
def add_store():
    data = request.get_json()
    store_id = uuid.uuid4().hex
    new_store = {**data, "id": store_id}
    db.stores[store_id] = new_store

    return new_store, 201


@app.get("/store/<string:store_id>")
def get_store_info(store_id):
    try:
        return db.stores[store_id], 200
    except KeyError:
        return {"message": "No such store found."}, 404


@app.get("/item/<string:item_id>")
def get_item(item_id):
    try:
        return db.items[item_id], 200
    except KeyError:
        return {"message": "No such item found."}, 404


@app.get("/item")
def get_all_items():
    return {"items": list(db.items.values())}, 200


@app.post("/item")
def create_item():
    data = request.get_json()
    if data['store_id'] not in db.stores:
        return {"message": "No such store found."}, 404

    item_id = uuid.uuid4().hex
    new_item = {**data, "id": item_id}
    db.items[item_id] = new_item

    return new_item, 201


@app.delete("/store/<string:store_id>")
def delete_store(store_id):
    try:
        del db.stores[store_id]
    except KeyError:
        pass

    return {"messages": f"Stores with id {store_id} removed."}, 200
