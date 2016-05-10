#include "config.h"
#include <stdlib.h>
#include <SoftwareSerial.h>

int Trig    = 9;
int Echo    = 8;
int pigLed  = 7;
int rxPin   = 2;
int txPin   = 3;


String apiIP = THINGS_SPEAK_IP;
String apiKey = THINGS_SPEAK_WRITE_KEY;
SoftwareSerial softwareSerial(rxPin,txPin);
float wallDistance = 33.0;
float soundVelocity = 34 / 1000;
 
void setup()
{
  pinMode(Trig, OUTPUT);
  pinMode(Echo, INPUT);
  pinMode(pigLed, OUTPUT);  
  softwareSerial.begin(115200);
  softwareSerial.println("AT+RST");  
  delay(2000);
}

void loop() {
 float distance=getDistance();
 if(distance<33.00) {
  digitalWrite(pigLed, HIGH);
 } else {
  digitalWrite(pigLed, LOW);
 }
 delay(15000);
}

float getDistance ()
{
  digitalWrite(Trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(Trig, LOW);
  long highleveltime = pulseIn(Echo, HIGH);
  float distance =  (highleveltime * soundVelocity) / 2;
  return distance;
}

void sendData(float value) {  
  //connect to the thingspeak server
  String cmd = "AT+CIPSTART=\"TCP\",\"";
  cmd+= apiIP;
  cmd+"\",80";
  softwareSerial.println(cmd);  
  delay(1000);
  if(softwareSerial.find("Error")){
    return;
  }
  // prepare GET string
  char buf[16];
  String valueString=dtostrf(value,0,2,buf);
  String getStr = "GET /update?api_key=";
  getStr += apiKey;
  getStr +="&field1=";
  getStr += String(valueString);
  getStr += "\r\n\r\n";
  // send data length
  cmd = "AT+CIPSEND=";
  cmd += String(getStr.length());
  softwareSerial.println(cmd);
  delay(1000);
  // send data or close the connection
  if(softwareSerial.find(">")){
    softwareSerial.print(getStr); 
  } else{
    cmd="AT+CIPCLOSE";
    softwareSerial.println(cmd);
  }
}