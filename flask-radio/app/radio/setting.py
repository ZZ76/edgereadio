#!/usr/bin/env python3
from flask import Blueprint, request, jsonify
from .. import socketio
from .models import Station
from .. import db
from .radio import get_all_stations
import time

setting = Blueprint('setting', __name__)

@setting.route('/add', methods=['POST'])
def add_station():
    try:
        #print(request.json)
        info = request.json
        if '' in [info['name'], info['url']]:
            raise ValueError('Empty name or url')
        station = Station(name=info['name'],
                    url=info['url'],
                    tags=info['tags'])
        db.session.add(station)
        db.session.commit()
        #print(station)
        socketio.emit('onReceiveStations', {"stations": get_all_stations()})
        return jsonify(success=True)
    except Exception as e:
        print('error:', e)
        return jsonify(success=False)

@setting.route('/update', methods=['PUT'])
def update_station():
    try:
        info = request.json
        if '' in [info['name'], info['url']]:
            raise ValueError('Empty name or url')
        station = Station.query.filter_by(id=info['id']).first()
        station.name = info['name']
        station.url = info['url']
        station.tags = info['tags']
        db.session.commit()
        socketio.emit('onReceiveStations', {"stations": get_all_stations()})
        return jsonify(success=True)
    except Exception as e:
        print('error:', e)
        return jsonify(success=False)

@setting.route('/remove', methods=['DELETE'])
def remove_station():
    try:
        info = request.json
        station = Station.query.filter_by(id=info['id']).first()
        db.session.delete(station)
        db.session.commit()
        socketio.emit('onReceiveStations', {"stations": get_all_stations()})
        return jsonify(success=True)
    except Exception as e:
        print('error:', e)
        return jsonify(success=False)
