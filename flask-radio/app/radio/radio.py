#!/usr/bin/env python3
import os
from flask import Flask, Blueprint, jsonify, request
#from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import emit
from .. import socketio
from .radio_vlc import Radio
from .models import Station
import time
from . import radio_api

basedir = os.path.abspath(os.path.dirname(__file__))
R = Radio()
#CORS(radio, supports_credentials=True)

@radio_api.route('/')
def index():
    return '<html><p>Hello from Radio!</p></html>'

@radio_api.route('/play', methods=['POST'])
def play():
    try:
        info = request.json
        _id = info['id']
        title = info['title']
        url = info['url']
        if '' in [title, url]:
            raise ValueError('Empty name or url')
        if url != R.url and title != R.title:
            # only reset station if new station is different from the current one
            R.station = {"id": _id, "title": title, "url": url, "volume": R.volume}
        R.play()
        socketio.emit("onReceivePlayingNow", R.station)
        socketio.emit("onReceiveCurrentStation", R.station)
        return jsonify(success=True)
    except Exception as e:
        print('error:', e)
        socketio.emit("onReceivePlayingNow", {"volume": R.volume})
        socketio.emit("onReceiveCurrentStation", {"volume": R.volume})
        return jsonify(success=False)

@radio_api.route('/stop', methods=['GET'])
def stop():
    try:
        if R.isplaying:
            R.pause()
        socketio.emit("onReceivePlayingNow", {})
        return jsonify(success=True)
    except Exception as e:
        print('error:', e)
        return jsonify(success=False)

@radio_api.route('/set-volume', methods=['POST'])
def set_volume():
    try:
        info = request.json
        R.volume = int(info['volume'])
        time.sleep(0.1)
        socketio.emit("onReceiveCurrentStation", R.station)
        return jsonify(success=True)
    except Exception as e:
        print('error:', e)
        socketio.emit("onReceiveCurrentStation", R.station)
        return jsonify(success=False)

@radio_api.route('/stations', methods=['GET'])
def stations():
    '''
    return all stations from db
    '''
    stations = Station.query.all()
    all_stations = []
    for s in stations:
        all_stations.append({'id': s.id,
         'name': s.name,
         'tags': s.tags})
    return jsonify(stations=all_stations)

@socketio.on('connect')
def socket_connect():
    print('connected')
    emit('response', {'data': 'Connected'})

@socketio.on('disconnect')
def socket_disconnect():
    emit('response', {'data': 'Disconnected'})

@socketio.on('all stations')
def all_stations_socket():
    emit('onReceiveStations', {"stations": get_all_stations()})

@socketio.on('playing now')
def playing_now():
    if R.isplaying:
        emit("onReceivePlayingNow", R.station)
    else:
        emit("onReceivePlayingNow", {})

@socketio.on('current station')
def current_station():
    emit('onReceiveCurrentStation', R.station)

def get_all_stations():
    stations = Station.query.all()
    result = []
    for s in stations:
        result.append({'id': s.id, 'name': s.name, 'url': s.url, 'tags': s.tags})
    return result
