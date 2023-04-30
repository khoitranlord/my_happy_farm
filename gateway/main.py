
import serial.tools.list_ports
import random
import time
import  sys
from  Adafruit_IO import  MQTTClient
import firebase_admin
import firebase_admin
from firebase_admin import credentials
import datetime
from firebase_admin import db
from firebase_admin import firestore    

DATABASE_URL = "https://okea-a0fe0-default-rtdb.asia-southeast1.firebasedatabase.app"

cred = credentials.Certificate("gateway/credential.json")
app = firebase_admin.initialize_app(cred, {
	'databaseURL': DATABASE_URL})

db = firestore.client()
ref = db.collection(u"ActivityLog")
from sys import platform

AIO_FEED_ID = ["bbc-light", "bbc-temp", "bbc-pump", "bbc-mode", "bbc-moisture", "bbc-light-on"]
AIO_USERNAME = "khoitran1422"
AIO_KEY = "aio_mbEP32Qg8BlgCx3yehIrDKUj8JN9"

def  connected(client):
    print("Ket noi thanh cong...")
    for feed in AIO_FEED_ID:
        client.subscribe(feed)

def  subscribe(client , userdata , mid , granted_qos):
    print("Subcribe thanh cong...")

def  disconnected(client):
    print("Ngat ket noi...")
    sys.exit (1)

def uart_write(data):
    ser.write((str(data)).encode())
    return

def  message(client , feed_id , payload):
    print("Data is recieved form:  " + feed_id, ", Payload: " + payload)
    log_content = {"Time": datetime.datetime.now(), "Description": ""}
    if isMicrobitConnected :
        log_content = {u"Username" : u"admin","Time": str(datetime.datetime.now()), u"Description": u""}
        if feed_id == "bbc-light-on":
            if (payload == "A"):
                uart_write("A")
                log_content[u"Description"] = u"Light turns on."
            elif (payload == "B"):
                uart_write("B")
                log_content[u"Description"] = u"Light turns off."
                
        elif (feed_id == "bbc-pump"):
            if (payload == "D"):
                uart_write("D")
                log_content[u"Description"] = u"Pump turns off."
            elif (payload == "C"):
                uart_write("C")
                log_content[u"Description"] = u"Pump turns on."
                
        elif (feed_id == "bbc-mode"):
            if (payload == "E"):
                uart_write("E")
                log_content[u"Description"] = u"Automatic mode activated"
            elif (payload == "F"):
                uart_write("F")
                log_content[u"Description"] = u"Automatic mode deactivated"
        if (log_content[u"Description"] == u""):
            log_content[u"Description"] = u"Unknown action!"
        update_time, doc_ref=ref.add(log_content)
        print(f'Added document with id {doc_ref.id}')
     	
    return
    

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()


def getPort():
    ports = serial.tools.list_ports.comports()
    N = len(ports)
    commPort = "None"
    if platform == "linux" or platform == "linux2":
        for i in range(0, N):
            port = ports[i]
            strPort = str(port.name)
            if "ttyUSB0" in strPort:
                splitPort = strPort.split(" ")
                commPort = (splitPort[0])
        return "/dev/" + str(commPort)
    elif platform == "win32":
        for i in range(0, N):
            port = ports[i]
            strPort = str(port.name)
            if "ttyUSB0" in strPort:
                splitPort = strPort.split(" ")
                commPort = (splitPort[0])
        return str(commPort)
    return commPort
    
isMicrobitConnected = False
if getPort () != " None ":
    ser = serial.Serial( port = getPort () , baudrate =115200)
    isMicrobitConnected = True

ser = serial.Serial( port=getPort(), baudrate=115200)
mess = ""
def processData(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    splitData = data.split(":")
    print(splitData)
    if splitData[1] == "LIGHT":
        client.publish("bbc-light", splitData[2])
    if splitData[1] == "TEMP":
        client.publish("bbc-temp", splitData[2])
    if splitData[1] == "PUMP":
        client.publish("bbc-pump", splitData[2])
    if splitData[1] == "MODE":
        client.publish("bbc-mode", splitData[2])
    if splitData[1] == "MOISTURE":
        client.publish("bbc-moisture", splitData[2])
    if splitData[1] == "LIGHT_ON":
        client.publish("bbc-light-on", splitData[2])
    
        

mess = ""
def readSerial():
    bytesToRead = ser.inWaiting()
    if (bytesToRead > 0):
        global mess
        mess = mess + ser.read(bytesToRead).decode("UTF-8")
        while ("#" in mess) and ("!" in mess):
            start = mess.find("!")
            end = mess.find("#")
            processData(mess[start:end + 1])
            if (end == len(mess)):
                mess = ""
            else:
                mess = mess[end+1:]

while True:
    if isMicrobitConnected :
        readSerial()
    time.sleep(1)
