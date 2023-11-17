#!/usr/bin/env python3
from flask import Blueprint

radio_api = Blueprint('radio', __name__)

from . import radio, models, radio_vlc, setting
radio_api.register_blueprint(setting.setting, url_prefix='/setting')
from .. import socketio
