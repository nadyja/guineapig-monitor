#include "config.h"
#include <stdlib.h>
#include <SoftwareSerial.h>

String apiKey = THINGS_SPEAK_WRITE_KEY;

int rxPin       = 3;
int txPin       = 2; //yellow
SoftwareSerial softwareSerial(rxPin,txPin);

void setup()
{
  Serial.begin(9600); 
  initWifi();
}

void loop() {
 float temp=getSensor();
 sendWifi(temp); 
 delay(15000);
}







void initWifi() {
  Serial.println("Init WiFi");
  softwareSerial.begin(115200);
  sendToSerial("AT+RST");
  delay(8000);
  readSerial();
  Serial.println("");
}



float getSensor() {
  return 5.0;
}
void sendToSerial(String cmd) {
  softwareSerial.println(cmd);
}
String readSerial() {
  while (softwareSerial.available() > 0) {
    char inByte = softwareSerial.read();
    // TODO push
    Serial.write(inByte);
  }
  return ">";
}

void sendWifi(float value) {  
  Serial.println("======");
  //connect to the thingspeak server
  sendToSerial("AT+CIPSTART=\"TCP\",\"184.106.153.149\",80");
  delay(1000);
  readSerial();
  Serial.println("");
  Serial.println("------");

  // prepare GET string
  char buf[16];
  String valueString=dtostrf(value,0,2,buf);
  String getStr = "GET /update?api_key=";
  getStr += apiKey;
  getStr +="&field1=";
  getStr += String(valueString);
  getStr += "\r\n\r\n";

  
  // send data length
  String cmd = "AT+CIPSEND=";
  cmd += String(getStr.length());
  sendToSerial(cmd);
  delay(1000);
  String result = readSerial();
  Serial.println("");
  Serial.println("------");

  if(result == ">") {
    sendToSerial(getStr);
    delay(1000);
    readSerial();
    Serial.println("");
    Serial.println("SUCCESS");
  } else {
    Serial.println("ERROR");
    Serial.println("expected: >");
    Serial.print("got: ");
    Serial.println(result);
    cmd="AT+CIPCLOSE";
    softwareSerial.println(cmd);
  }
}


