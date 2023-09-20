import uuid
import db

from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort

from schemas import StoreSchema, StoreUpdateSchema

blp = Blueprint('Stores', __name__, description="Operations on stores")


@blp.route("/store/<string:store_id>")
class Store(MethodView):
    @blp.response(200, StoreSchema)
    def get(self, store_id):
        try:
            return db.stores[store_id]
        except KeyError:
            abort(404, message="No such store found")

    @blp.arguments(StoreUpdateSchema)
    @blp.response(200, StoreSchema)
    def put(self, data, store_id):
        try:
            db.stores[store_id]['name'] = data['name']
            return db.stores[store_id]
        except KeyError:
            abort(404, message="Store not found.")

    def delete(self, store_id):
        try:
            del db.stores[store_id]
        except KeyError:
            pass

        return {"messages": f"Stores with id {store_id} removed."}, 200


@blp.route("/store")
class StoreList(MethodView):
    @blp.arguments(StoreSchema(many=True))
    def get(self):
        return {"stores": list(db.stores.values())}

    @blp.arguments(StoreSchema)
    @blp.response(200, StoreSchema)
    def post(self, data):
        found = list(filter(lambda s: s['name'] == data['name'], db.stores.values()))
        if found:
            abort(400, message="Store already exists.")

        store_id = uuid.uuid4().hex
        new_store = {**data, "id": store_id}
        db.stores[store_id] = new_store

        return new_store
