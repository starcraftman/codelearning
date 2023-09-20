import uuid
import db

from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort

from schemas import ItemSchema, ItemUpdateSchema

blp = Blueprint('Items', __name__, description="Operations on items")


@blp.route("/item/<string:item_id>")
class Item(MethodView):
    @blp.response(200, ItemSchema)
    def get(self, item_id):
        try:
            return db.items[item_id]
        except KeyError:
            abort(404, message="No such item found")

    @blp.arguments(ItemUpdateSchema)
    @blp.response(200, ItemSchema)
    def put(self, data, item_id):
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
    @blp.response(200, ItemSchema(many=True))
    def get(self):
        return list(db.items.values())

    @blp.arguments(ItemSchema)
    @blp.response(201, ItemSchema)
    def post(self, data):
        for item in db.items.values():
            if item['name'] == data['name'] and item['store_id'] == data['store_id']:
                abort(400, message="Item already exists.")

        item_id = uuid.uuid4().hex
        new_item = {**data, "id": item_id}
        db.items[item_id] = new_item

        return new_item
