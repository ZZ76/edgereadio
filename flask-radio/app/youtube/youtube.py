#!/usr/bin/env python3
import os
from flask import Flask, Blueprint, jsonify, request
#from flask_cors import CORS
from flask_socketio import emit
from .. import socketio
from .youtube_audio_vlc import YoutubeAudioPlayer
import time
from . import youtube_api

Y = YoutubeAudioPlayer()

@youtube_api.route('/')
def index():
    return '<html><p>Hello from Youtube api!</p></html>'

@youtube_api.route('/play', methods=['POST'])
def play():
    try:
        info = request.json
        url = info['url']
        if '' in [url]:
            raise ValueError('Empty name or url')
        Y.site = url
        Y.play()
        return jsonify(success=True)
    except Exception as e:
        print('error:', e)
        return jsonify(success=False)
    finally:
        socketio.emit('onReceive Youtube Media', Y.media_info)
        socketio.emit('onReceive Youtube Player', Y.player_info)


@youtube_api.route('/stop', methods=['GET'])
def stop():
    try:
        if Y.isplaying:
            Y.pause()
        return jsonify(success=True)
    except Exception as e:
        print('error:', e)
        return jsonify(success=False)
    finally:
        socketio.emit('onReceive Youtube Media', Y.media_info)
        socketio.emit('onReceive Youtube Player', Y.player_info)

@youtube_api.route('/set-volume', methods=['POST'])
def set_volume():
    try:
        info = request.json
        Y.volume = int(info['volume'])
        time.sleep(0.1)
        return jsonify(success=True)
    except Exception as e:
        print('error:', e)
        return jsonify(success=False)
    finally:
        socketio.emit('onReceive Youtube Media', Y.media_info)
        socketio.emit('onReceive Youtube Player', Y.player_info)

@youtube_api.route('/set-position', methods=['POST'])
def set_position():
    try:
        info = request.json
        Y.position = info['position']
        time.sleep(0.1)
        return jsonify(success=True)
    except Exception as e:
        print('error:', e)
        return jsonify(success=False)
    finally:
        socketio.emit('onReceive Youtube Media', Y.media_info)
        socketio.emit('onReceive Youtube Player', Y.player_info)

@youtube_api.route('/fast5', methods=['GET'])
def fast5():
    try:
        Y.fastforward(5)
        return jsonify(success=True)
    except Exception as e:
        print('error:', e)
        return jsonify(success=False)
    finally:
        socketio.emit('onReceive Youtube Media', Y.media_info)
        socketio.emit('onReceive Youtube Player', Y.player_info)

@youtube_api.route('/fast10', methods=['GET'])
def fast10():
    try:
        Y.fastforward(10)
        return jsonify(success=True)
    except Exception as e:
        print('error:', e)
        return jsonify(success=False)
    finally:
        socketio.emit('onReceive Youtube Media', Y.media_info)
        socketio.emit('onReceive Youtube Player', Y.player_info)

@youtube_api.route('/back5', methods=['GET'])
def back5():
    try:
        Y.fastforward(-5)
        return jsonify(success=True)
    except Exception as e:
        print('error:', e)
        return jsonify(success=False)
    finally:
        socketio.emit('onReceive Youtube Media', Y.media_info)
        socketio.emit('onReceive Youtube Player', Y.player_info)

@youtube_api.route('/back10', methods=['GET'])
def back10():
    try:
        Y.fastforward(-10)
        return jsonify(success=True)
    except Exception as e:
        print('error:', e)
        return jsonify(success=False)
    finally:
        socketio.emit('onReceive Youtube Media', Y.media_info)
        socketio.emit('onReceive Youtube Player', Y.player_info)


@socketio.on('connect')
def socket_connect():
    print('connected')
    emit('response', {'data': 'Connected'})

@socketio.on('disconnect')
def socket_disconnect():
    emit('response', {'data': 'Disconnected'})

@socketio.on('Youtube Media')
def playing_now():
    socketio.emit('onReceive Youtube Media', Y.media_info)

@socketio.on('Youtube Player')
def current_station():
    socketio.emit('onReceive Youtube Player', Y.player_info)
