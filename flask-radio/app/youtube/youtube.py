#!/usr/bin/env python3
import os
from flask import Flask, Blueprint, jsonify, request
#from flask_cors import CORS
from flask_socketio import emit
from .. import socketio
from .youtube_audio_vlc import YoutubeAudioPlayer
import time
from . import youtube_api

class YoutubeUpdater():

    is_connected = False
    is_running = False

    def __init__(self, Y):
        self.Y = Y

    def main(self):
        if self.is_running:
            return
        else:
            self.is_running = True
        while self.is_connected:
            print('updating')
            socketio.emit('onReceive Youtube Player', self.Y.player_info)
            time.sleep(1)
        self.is_running = False

    def start(self):
        self.is_connected = True
        self.main()

    def stop(self):
        self.is_connected = False

is_connected = False
Y = YoutubeAudioPlayer()
last_time = time.time()
#YU = YoutubeUpdater(Y)

def update_player_info():
    global A
    c = 0
    print('created async function')
    while is_connected == True:
        c += 1
        if not Y.isplaying:
            break
        try:
            print('update')
            print(A)
            print(c)
            socketio.emit('onReceive Youtube Player', Y.player_info)
            time.sleep(1)
        except Exception as e:
            print(e)
            break

@youtube_api.route('/')
def index():
    return '<html><p>Hello from Youtube api!</p></html>'

@youtube_api.route('/play', methods=['POST', 'GET'])
def play():
    if request.method == 'POST':
        try:
            info = request.json
            url = info['url']
            if '' in [url]:
                raise ValueError('Empty name or url')
            Y.site = url
            Y.play()
            result = True
        except Exception as e:
            print('error:', e)
            result = False
        finally:
            time.sleep(0.2)
            socketio.emit('onReceive Youtube Media', Y.media_info)
            socketio.emit('onReceive Youtube Player', Y.player_info)
            return jsonify(success=result)
    else:
        try:
            Y.play()
            result = True
        except Exception as e:
            print('error:', e)
            result = False
        finally:
            socketio.emit('onReceive Youtube Media', Y.media_info)
            socketio.emit('onReceive Youtube Player', Y.player_info)
            return jsonify(success=result)


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

#@youtube_api.route('/test-start', methods=['GET'])
#def test_start():
#    print(YU)
#    YU.start()
#    return {'test': str(YU)}
#
#@youtube_api.route('/test-stop', methods=['GET'])
#def test_stop():
#    YU.stop()
#    return {'test': str(YU)}

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

@socketio.on('Realtime Player')
def realtime_player():
    global last_time
    current_time = time.time()
    if current_time - last_time > 0.5:
        last_time = current_time
        socketio.emit('onReceive Youtube Player', Y.player_info)
