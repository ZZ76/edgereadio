#!/usr/bin/env python3
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, emit
from config import config
from flask_cors import CORS

db = SQLAlchemy()
socketio = SocketIO(cors_allowed_origins="*")

def create_app(config_name):
    if config[config_name].DEBUG:
            os.environ['FLASK_DEBUG'] = '1'
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    CORS(app, supports_credentials=True)
    config[config_name].init_app(app)
    db.init_app(app)
    socketio.init_app(app)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    from .setting import setting as setting_blueprint
    app.register_blueprint(setting_blueprint, url_prefix='/setting')

    return app
