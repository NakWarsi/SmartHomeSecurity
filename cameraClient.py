from picamera import PiCamera
from time import sleep
import RPi.GPIO as GPIO
from uuid import getnode as get_mac
import time
import socket
import ssl
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.IN)

uuiddevice = get_mac() # Creating UUID for each device
uuiddevString = ':'.join(("%012X" % mac)[i:i+2] for i in range(0, 12, 2))
print("UUID of current Raspberry Pi = %s",uuiddevString)
videofilename=uuiddevString+"_videotest.h264"

camera = PiCamera()
camera.resolution= (720,480)
camera.framerate=24
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # Creating socket
server_address = ('localhost', 10006) # ip address, port no
ssl_sock=ssl.wrap_socket(sock,cert_reqs=1,ca_certs='/home/pi/project/SSL_Key_Cert/server.crt')
ssl_sock.connect(server_address)
while True:
	i=GPIO.input(11)
	if(i==1):
		camera.start_preview()
		camera.start_recording('/home/pi/project/vidrec//'+videofilename)
		sleep(10)
		camera.stop_recording()
		print("Finished Recording")
		sleep(1)
		camera.stop_preview()
		ssl_sock.send(uuiddevString.encode())
		sleep(1)
		readvideo = open('/home/pi/project/vidrec//'+videofilename,'rb')
		bufferbinarysend = readvideo.read(3072)
		while (bufferbinarysend) :
                    ssl_sock.send(bufferbinarysend)
                    print("Sending Video to Server")
                    bufferbinarysend = readvideo.read(3072)
                readvideo.close()
                print("Video Recording Successfully Sent")
                ssl_sock.close()
                print("Websocket Connection Closed Successfully")
	if(i==0):
		#No Motion Detected
		sleep(1)


