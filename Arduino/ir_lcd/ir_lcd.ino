#include "config.h"
#include <stdlib.h>
#include <string.h>
#include <LiquidCrystal.h>


String apiKey = THINGS_SPEAK_WRITE_KEY;

int irPin     = A0;

int LCDRS       = 2;
int LCDEnable   = 3;
int LCDD4       = 4;
int LCDD5       = 5;
int LCDD6       = 6;
int LCDD7       = 7;
 
LiquidCrystal lcd(LCDRS, LCDEnable, LCDD4, LCDD5, LCDD6, LCDD7);





int i=0;
int totalErrorCount=0;
int concurrentErrorCount=0;
int totalSuccessCount=0;
int seconds=15;


void setup()
{
  lcd.begin(16, 2);
  Serial.begin(9600);
}



static char outstr[15];
void loop() {
    //float temp=getTemp();
    //printTemp();
    float distance=getDistance();
    Serial.println(distance);
    dtostrf(distance,7, 0, outstr);
    print(outstr,2);
    delay(1000);
}

void print(String text, int pos) {
  if(pos==1) {
    lcd.setCursor(0, 0);
    lcd.print("        ");
    lcd.setCursor(0, 0);
    lcd.print(text);
  } 
  if(pos==2) {
    lcd.setCursor(8, 0);
    lcd.print("        ");
    lcd.setCursor(16-text.length(), 0);
    lcd.print(text);
  } 
  if(pos==3) {
    lcd.setCursor(0, 1);
    lcd.print("        ");
    lcd.setCursor(0, 1);
    lcd.print(text);
  } 
  if(pos==4) {
    lcd.setCursor(8, 1);
    lcd.print("        ");
    lcd.setCursor(16-text.length(), 1);
    lcd.print(text);
  } 
}


float getDistance() {

  int rawvoltage= analogRead(irPin);
  //float millivolts= (rawvoltage/1024.0) * 5000;
  //float celsius= millivolts/10;
  //if(celsius>50) return 25.0;
  return rawvoltage;
  
}



