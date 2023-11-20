from youtube_audio_vlc import YoutubeAudioPlayer
import time

url = 'https://www.youtube.com/watch?v=T_lC2O1oIew'
Y = YoutubeAudioPlayer()

Y.site = url

print(Y.site.keys())
print(Y.site['thumbnail'])
print(Y.site['webpage_url'])

print('duration:', Y.duration)
Y.play()
#print('play')
#time.sleep(5)
#print('current time:', Y.current_time)
#
#print('jump 0.2')
#Y.jump_to_position(0.2)
#print('current time:', Y.current_time)
#time.sleep(5)

print('jump 0.9')
Y.jump_to_position(0.9)
print('current time:', Y.current_time)
time.sleep(5)
Y.stop()

## change url
#print('change url')
#url_2 = 'https://www.youtube.com/watch?v=dadU79KQzO0'
#Y.site = url_2
#print('duration:', Y.duration)
#Y.play()
#time.sleep(5)
#print('jump and play 0.t')
#Y.jump_to_position(0.5)
#print('current time:', Y.current_time)
#time.sleep(5)
#print('jump 0.5')
#Y.jump_to_position(0.5)
#print('current time:', Y.current_time)
#time.sleep(5)
#Y.stop()
