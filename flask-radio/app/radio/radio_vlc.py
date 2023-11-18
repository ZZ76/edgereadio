#!/usr/bin/env python3
import vlc
import time


class Radio:

    def __init__(self):
        self.__isplaying = False
        self.__url = ''
        self.__instance = vlc.Instance('--input-repeat=-1', '--fullscreen')
        self.__player = self.__instance.media_player_new()
        self.__player.audio_set_volume(50)
        self.__volume = self.__player.audio_get_volume()
        self.__media = None
        self.__id = None
        self.__title = ''

    @property
    def url(self):
        return self.__url

    @property
    def isplaying(self):
        return self.__isplaying

    @property
    def station(self):
        return {"id": self.__id, "title": self.__title, "url": self.__url, "volume": self.volume}

    @property
    def volume(self):
        try:
            return self.__player.audio_get_volume()
        except Exception as e:
            print('error:', e)
            return 0

    @property
    def title(self):
        return self.__title

    @station.setter
    def station(self, station: dict):
        self.__id = station["id"]
        self.__title = station["title"]
        self.__url = station["url"]

    @url.setter
    def url(self, url: str):
        '''
        set new url
        if is playing: stop then play new url
        '''
        self.__url = url
        if self.__isplaying:
            self.__player.stop()
            self.play()

    @volume.setter
    def volume(self, v: int):
        return self.__player.audio_set_volume(v)

    def play(self):
        '''
        '''
        try:
            if self.__url:
                self.__media = self.__instance.media_new(self.__url)
            else:
                return
            self.__player.set_media(self.__media)
            self.__isplaying = True
            self.__player.play()
            return
        except Exception as e:
            print(e)

    def get_meta(self):
        self.__media.parse_async()
        while self.__media.is_parsed():
            for i in range(25):
                    meta = self.__media.get_meta(i)
                    if meta != None:
                            print(f'get {i}: {meta}')
            time.sleep(0.2)
            break
        meta = self.__media.get_meta(0)
        return meta

    def stop(self):
        self.__isplaying = False
        self.__player.stop()

    def pause(self):
        self.__isplaying = False
        self.__player.pause()

    def __del__(self):
        if self.__isplaying:
            self.__player.stop()
