import socket
import sys
import ssl
import os
import shutil

cwd = os.getcwd()
KEY = cwd + '/SSL_Key_Cert/server.key'
CERT = cwd + '/SSL_Key_Cert/server.crt'
filepath= cwd + '/WSvidrecv/'

#KEY='/home/pi/project/SSL_Key_Cert/server.key'
#CERT='/home/pi/project/SSL_Key_Cert/server.crt'
#/var/www/html

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # Creating Socket
host = socket.gethostname() 
#server_address = ('localhost', 10007)
server_address = (host,10016)
sock.bind(server_address)
sock.listen(10)
sock_ssl = ssl.wrap_socket(sock,keyfile=KEY,certfile=CERT,server_side=True)
print('SSL socket created')
print("Server is listening for clients ...")

while True:
    conn, addr = sock_ssl.accept()     # Establish connection with client.
    print('Got connection from ', addr)
    #clientuuid= conn.recv(21)
    #strclientuuid= clientuuid.decode("utf-8")
    #print("Client UUID is  = ",strclientuuid)
    #vidrecfilename = strclientuuid+'_videorectest.h264'
    with open(filepath + 'vidrec.mp4', 'wb+') as f:
        while True:
            print("Recieving Data ....")
            data = conn.recv(3072)
            print("Data = ",data)
            if not data:
                break
            f.write(data)
    f.close()
    print("Successfully Received Video Recording")
    conn.close()
    print("Successfully closed websocket connection")
    print("Making Video Available to Android App")
    shutil.copy2(filepath+'vidrec.mp4', '/var/www/html/vidrec.mp4')
    subprocess.call(['touch',cwd +'/notificationPush/temp.txt'])
    print("Video is now available")
