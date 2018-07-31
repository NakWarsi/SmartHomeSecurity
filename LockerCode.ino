#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#define lock D0
// Update these with values suitable for your network.

const char* ssid = "MC_LGv30";
const char* password = "mih12345";
//const char* mqtt_server = "broker.mqtt-dashboard.com";
const char* mqtt_server = "18.222.90.144";
WiFiClient espClient;
PubSubClient client(espClient);


void setup() {
  pinMode(lock, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.print("Connecting to WiFi..");
  } 
  Serial.println("Connected to the WiFi network");
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);       // need to be analysed

//making connection to mqtt
while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
    //if (client.connect("ESP8266Client", mqttUser, mqttPassword )) {
      if (client.connect("ESP8266Client")){
      Serial.println("connected");  
    } else {
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000); 
    }
}
client.subscribe("Lock");
}



void callback(char* topic, byte* payload, unsigned int length) {
  char ip;
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    ip=(char)payload[i];
    //Serial.print((char)payload[i]);
    Serial.print(ip);
  }
  Serial.println();
  Serial.println("-----------------------");
  
if (ip == '1')
  {
     Serial.println("Unlocking the Door");
     digitalWrite(lock, HIGH);
  }
  else
  {
     Serial.println("Locking the Door");
     digitalWrite(lock, LOW);
  }
}

void loop() {
  client.loop();
}
