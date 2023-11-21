#!/usr/bin/env python3
import vlc
import time
import yt_dlp
import json


class YoutubeAudioPlayer:

    ydl_opts = {
        'format': 'm4a/bestaudio/best',
        'postprocessors': [{  # Extract audio using ffmpeg
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'm4a',
        }]
    }

    def __init__(self):
        self.__instance = vlc.Instance('--input-repeat=-1', '--fullscreen')
        self.__player = self.__instance.media_player_new()
        self.__player.audio_set_volume(50)
        self.__site = None # site information in json
        self.__isplaying = False
        self.__site_url = ''
        self.__audio_url = ''
        self.__media = None
        self.__duration = None
        self.__title = ''
        self.__description = ''
        self.__current_time = 0
        self.__position = 0
        self.__thumbnail = ''


    @property
    def site(self):
        return self.__site

    @property
    def site_url(self):
        return self.__site_url

    @property
    def audio_url(self):
        return self.__audio_url

    @property
    def isplaying(self):
        if self.__player.get_state().value == 6:
            self.__player.stop()
            self.__isplaying = False
        return self.__isplaying

    @property
    def volume(self):
        try:
            return self.__player.audio_get_volume()
        except Exception as e:
            print('error:', e)
            return 0

    @property
    def duration(self):
        return self.__duration

    @property
    def current_time(self):
        return self.__player.get_time()

    @property
    def position(self):
        if self.__media:
             return self.__player.get_position()
        else:
            return 0

    @property
    def media_info(self):
        info = {}
        info['url'] = self.__site_url
        info['title'] = self.__title
        info['description'] = self.__description
        info['thumbnail'] = self.__thumbnail
        info['duration'] = self.__duration
        return info

    @property
    def player_info(self):
        info = {}
        info['isplaying'] = self.isplaying
        info['volume'] = self.volume
        info['current_time'] = self.current_time
        info['position'] = self.position
        return info

    @property
    def player_state(self):
        return self.__player.get_state()

    @site.setter
    def site(self, site_url: str):
        '''
        set new url
        update variables
        if is playing: stop then play new url
        '''
        if site_url == self.site_url:
            return
        if self.__isplaying:
            self.__isplaying = False
            self.stop()
        try:
            self.reset_info()
            self.__site = self.get_info(site_url)
            self.__site_url = site_url
            self.__audio_url = self.site['url']
            self.__title = self.site['title']
            self.__duration = self.site['duration']
            self.__description = self.site['description']
            self.__thumbnail = self.site['thumbnail']

            self.__media = self.__instance.media_new(self.audio_url)
            self.__player.set_media(self.__media)
        except Exception as e:
            print(e)

    @volume.setter
    def volume(self, v: int):
        return self.__player.audio_set_volume(v)

    @position.setter
    def position(self, p: float):
        self.jump_to_position(p)

    def reset_info(self):
        self.__site_url = ''
        self.__audio_url = ''
        self.__media = None
        self.__duration = None
        self.__title = ''
        self.__description = ''
        self.__current_time = 0
        self.__position = 0
        self.__thumbnail = ''

    def set_site(self, site_url: str):
        '''
        '''
        if self.isplaying:
            self.__player.stop()
        self.site_url = site_url
        self.play()

    def jump_to_position(self, position: float):
        if position > 1 or position < 0:
            return
        try:
            self.__player.set_position(position)
        except Exception as e:
            print(e)

    def play(self):
        '''
        player.get_state()
        5 vlc.State.Stopped
        6 vlc.State.Ended
        '''
        try:
            if self.__player.get_state().value == 6:
                self.__player.stop()
            if self.site:
                self.__isplaying = True
                self.__player.play()
            else:
                return
            return
        except Exception as e:
            print(e)

    def stop(self):
        self.__isplaying = False
        self.__player.stop()

    def pause(self):
        self.__isplaying = False
        self.__player.pause()

    def __del__(self):
        if self.__isplaying:
            self.__player.stop()

    def get_info(self, url):
        with yt_dlp.YoutubeDL(YoutubeAudioPlayer.ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            return ydl.sanitize_info(info)

    def fastforward(self, seconds: int):
        '''
        seconds>0 fastward
        seconds<0 backward
        duration: second
        ct = current_time: milisecond = second * 1000
        tt = target_time
        cp = current_position
        tp = target_position
        '''
        try:
            ct = self.current_time
            tt = ct + seconds * 1000
            if tt >= self.duration*1000:
                self.jump_to_position(1)
                return
            elif tt <= 0:
                self.jump_to_position(0)
                return
            else:
                tp = tt / (self.duration*1000)
                self.jump_to_position(tp)
                return
        except Exception as e:
            print(e)
            return
