import uuid
import db

from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort

blp = Blueprint('Items', __name__, description="Operations on items")


@blp.route("/item/<string:item_id>")
class Item(MethodView):
    def get(self, item_id):
        try:
            return db.items[item_id], 200
        except KeyError:
            abort(404, message="No such item found")

    def put(self, item_id):
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

    def delete(self, item_id):
        try:
            del db.items[item_id]
        except KeyError:
            pass

        return {"messages": f"Items with id {item_id} removed."}, 200


@blp.route("/item")
class ItemList(MethodView):
    def get(self):
        return {"items": list(db.items.values())}, 200

    def post(self):
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
