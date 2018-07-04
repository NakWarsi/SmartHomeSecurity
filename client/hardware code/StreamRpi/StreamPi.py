import websocket
import time
import picamera
import io
import base64
import StringIO

class MyClass:
    ws = ''
    picam = ''
    stream = ''

    def __init__(self):
        self.init()

    def on_message(self,ws , message):
        print ws + "ok"
        print message

    def on_error(self, ws, error):
        print error

    def on_close(self, ws):
        print "down"
        exit()

    def on_open(self, ws):
        print "opening connection"
        ws.send("Hello.")
        self.main()

    def main(self):
        print "main"
        output = StringIO.StringIO()
        while True:
            output.seek(0)
            self.picam.capture(output, format="jpeg")
            encoded_string = base64.b64encode(output.getvalue())
            self.ws.send("{\"Image\":\""+encoded_string+"\"}")
            time.sleep(0.2)
            output.flush()

    def init(self):
        print "init"
        websocket.enableTrace(True)
        self.picam = picamera.PiCamera()
        self.picam.resolution = (640, 480)
        self.stream = io.BytesIO()
        self.picam.start_preview()
        self.ws = websocket.WebSocketApp("ws://xxxxx.",
                              on_message = self.on_message,
                              on_error = self.on_error,
                              on_close = self.on_close,
                              on_open= self.on_open)
        self.ws.run_forever()