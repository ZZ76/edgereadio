#!/usr/bin/env python3
from flask import Blueprint

youtube_api = Blueprint('youtube', __name__)

from . import youtube_audio_vlc, youtube
#radio_api.register_blueprint(setting.setting, url_prefix='/setting')
#from .. import socketio
