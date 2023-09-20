import json

from flask import Flask
import flask_smorest

import resources.item
import resources.store

app = Flask(__name__)
app.config.from_file("config.json", load=json.load)

api = flask_smorest.Api(app)
api.register_blueprint(resources.item.blp)
api.register_blueprint(resources.store.blp)
