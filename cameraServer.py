import socket
import sys
import ssl

KEY='/home/pi/project/SSL_Key_Cert/server.key'
CERT='/home/pi/project/SSL_Key_Cert/server.crt'

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # Creating Socket
server_address = ('localhost', 10006)
sock.bind(server_address)
sock.listen(10)
sock_ssl = ssl.wrap_socket(sock,keyfile=KEY,certfile=CERT,server_side=True)
print('SSL socket created')
print("Server is listening for clients ...")

while True:
    conn, addr = sock_ssl.accept()     # Establish connection with client.
    print 'Got connection from', addr
    clientuuid= conn.recv(21)
    print("Client UUID is  = %s",clientuuid)
    vidrecfilename=clientuuid+'_videorectest.h264'
    with open('/home/pi/project/WSvidrecv//'+vidrecfilename, 'wb+') as f:
        while True:
            print("Recieving Data ....")
            data = conn.recv(3072)
            if not data:
                break
            f.write(data)
f.close()
print("Successfully Received Video Recording")
conn.close()
print("Successfully closed websocket connection")
    
    