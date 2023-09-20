import uuid
import db

from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort

blp = Blueprint('Stores', __name__, description="Operations on stores")


@blp.route("/store/<string:store_id>")
class Store(MethodView):
    def get(self, store_id):
        try:
            return db.stores[store_id], 200
        except KeyError:
            abort(404, message="No such store found")

    def put(self, store_id):
        data = request.get_json()
        if "name" not in data:
            abort(400, message="Bad request. Missing required fields: 'name'")

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
    def get(self):
        return {"stores": list(db.stores.values())}

    def post(self):
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
