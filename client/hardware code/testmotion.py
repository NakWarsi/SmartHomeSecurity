import RPi.GPIO as GPIO             #importing the RPi.GPIO module
import time                        #importing the time module
GPIO.cleanup()                     #to clean up at the end of your script
motion_pin = 35                    #select the pin for the motion sensor
def init():
  GPIO.setmode(GPIO.BOARD)         #to specify which pin numbering system
  GPIO.setwarnings(False)    
  GPIO.setup(motion_pin,GPIO.IN,pull_up_down=GPIO.PUD_UP)  #declare the motion_pin as an input
  print("-----------------------------------------------------------------------")  

def main():
  while True:
    print("Inside Main")
    value=GPIO.input(motion_pin)  
    if value!=0:                             #to read the value of a GPIO pin
      time.sleep(200)        #delay 2ms
      print("Motion Detected")
    else:
      time.sleep(200)       #delay 2ms
      print("No Motion Detected")                         #print information

init()
main()
GPIO.cleanup()
