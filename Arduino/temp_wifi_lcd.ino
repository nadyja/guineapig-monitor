#include "config.h"
#include <stdlib.h>
#include <SoftwareSerial.h>
#include <LiquidCrystal.h>


String apiKey = THINGS_SPEAK_WRITE_KEY;

int tempPin     = A0;

int ledError    = 8;
int ledSuccess  = 9;

int rxPin       = 11;
int txPin       = 12; //green

int LCDRS       = 2;
int LCDEnable   = 3;
int LCDD4       = 4;
int LCDD5       = 5;
int LCDD6       = 6;
int LCDD7       = 7;
 
LiquidCrystal lcd(LCDRS, LCDEnable, LCDD4, LCDD5, LCDD6, LCDD7);
SoftwareSerial ser(rxPin,txPin);




byte downArr[8] = {
  0b00100,
  0b00100,
  0b00100,
  0b00100,
  0b00100,
  0b10101,
  0b01110,
  0b00100
};

int i=0;
 
void setup()
{
  pinMode(ledSuccess, OUTPUT);    
  pinMode(ledError, OUTPUT);   
   
  
  ser.begin(9600);
  Serial.begin(9600);

  lcd.begin(16, 2);
  

  
  
  String cmd= "AT+RST";
  ser.println(cmd);
  debugPrint(cmd);
  delay(2000);
}
int totalErrorCount=0;
int concurrentErrorCount=0;
int totalSuccessCount=0;
int seconds=15;

void printTemp() {
    float temp=getTemp();
    lcd.setCursor(0, 0);
    lcd.print(temp);
    lcd.setCursor(6, 0);
    byte upArr[8] = {
        0b00100,
        0b01110,
        0b10101,
        0b00100,
        0b00100,
        0b00100,
        0b00100,
        0b00100
      };
    lcd.createChar(0, upArr);
    lcd.write((uint8_t)0);


    if(temp>30.00) {
      lcd.setCursor(6, 0);
      lcd.print("PIG");
      } else {
        lcd.setCursor(6, 0);
      lcd.print("   ");
      
        }

    lcd.setCursor(0, 1);
    lcd.print(totalSuccessCount);
    lcd.print(" / ");
    lcd.print(totalErrorCount);
  }


void doSuccess() {

    totalSuccessCount++;
    concurrentErrorCount=0;
    
    digitalWrite(ledSuccess, HIGH);
    Serial.println("OK");
    lcd.setCursor(11, 0);
    lcd.print("   OK");   
  }
void doError(int kind) {
    totalErrorCount++;
    concurrentErrorCount++;
    
    lcd.setCursor(11, 0);
    lcd.print("     ");   
    lcd.setCursor(11, 0);
    lcd.print("ERR");
    lcd.setCursor(14, 0);
    lcd.print(concurrentErrorCount);
    
    digitalWrite(ledError, HIGH);
    Serial.println("AT+CIPSTART error");
    if(concurrentErrorCount>10) seconds=120;
  }
// the loop 




void loop() {
    float temp=getTemp();
    printTemp();

     lcd.setCursor(14, 1);
      lcd.print("  ");
      lcd.setCursor(14, 1);
      lcd.print(seconds);
    if(seconds==0) {
      printTemp();
      
      Serial.println(""); 
      Serial.print("sendData: "); 
      Serial.print(temp);
      sendData(temp); 
      seconds=15;
    } 
    seconds-=1;
    delay(1000);
}

float getTemp() {

  int rawvoltage= analogRead(tempPin);
  float millivolts= (rawvoltage/1024.0) * 5000;
  float celsius= millivolts/10;
  if(celsius>50) return 25.0;
  return celsius;
  
}

void sendData(float value) {
  Serial.println("");
   digitalWrite(ledSuccess, LOW);
   digitalWrite(ledError, LOW);

  lcd.setCursor(11, 0);
    lcd.print(" SEND");  
  
  String cmd = "AT+CIPSTART=\"TCP\",\"184.106.153.149\",80";
  //Serial.println(cmd);
  ser.println(cmd);
  //Serial.println(cmd);
  debugPrint(cmd);
  delay(1000);
  if(ser.find("Error")){
     
    doError(1);

    return;
  }
  
  // prepare GET string
  char tempbuffer[16];
  String valueString=dtostrf(value,0,2,tempbuffer);
  String getStr = "GET /update?api_key=";
  getStr += apiKey;
  getStr +="&field1=";
  getStr += String(valueString);
  getStr += "\r\n\r\n";
  //Serial.println(getStr);
  // send data length
  cmd = "AT+CIPSEND=";
  cmd += String(getStr.length());
  ser.println(cmd);
  debugPrint(cmd);
  delay(1000);
  if(ser.find(">")){
    ser.print(getStr);
    debugPrint(cmd);
    
      doSuccess();
  
  }
  else{
    cmd="AT+CIPCLOSE";
    ser.println(cmd);
    debugPrint(cmd);
    doError(2);
  
    //Serial.println("AT+CIPCLOSE");
  }
}

void debugPrint(String str) {
 
  Serial.println("");
   Serial.println(str);
  Serial.println(ser.read());
}


