from picamera import PiCamera
from time import sleep
import RPi.GPIO as GPIO
import time
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.IN)

camera = PiCamera()
camera.resolution= (720,480)
camera.framerate=24

while True:
	i=GPIO.input(11)
	if(i==1):
		camera.start_preview()
		camera.start_recording('/home/pi/project/vidrec/videotest.h264')
		sleep(10)
		camera.stop_recording()
		print("Finished Recording")
		sleep(1)
		camera.stop_preview()
	if(i==0):
		#No Motion Detected
		sleep(1)

