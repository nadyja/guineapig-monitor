#include <Arduino.h>

#include <stdlib.h>
#include <SoftwareSerial.h>
#include <LiquidCrystal.h>
#include <string.h>
#include "./config.h"
#include "./pins.h"
#include "./wifi.h"
#include "./lcd.h"
#include "./scale.h"


Scale scale(whiteDOUT, greenCLK, 800.0);
Wifi wifi (greenRX, yellowTX, THINGS_SPEAK_WRITE_KEY, THINGS_SPEAK_IP);
LCDDisplay lcd(LCDRS, LCDEnable, LCDD4, LCDD5, LCDD6, LCDD7);

float counter = 0.0;
float tick = 1000.0;
float bigTick = 15000.0;


void eachTick() {
  lcd.printFloat(counter, BOTTOM_RIGHT);
  float weight=scale.read();
  lcd.clear();
  lcd.printFloat(weight, TOP_LEFT);
}
void eachLoop() {
  lcd.print("SEND", BOTTOM_RIGHT);
  String result = wifi.sendWifi(scale.read());
  processOrder(result);
  lcd.print("OK", BOTTOM_RIGHT);
}
void processOrder(String order) {
  // if error - flash read
  // if ok - flash green
  // if reset - tare();
  // if off - stop loop
  // if on - start loop
}

void setup()
{
  lcd.init();
  lcd.print("INIT", BOTTOM_RIGHT);
  scale.init();
  wifi.init();
}


void loop() {
  eachTick();
 if(counter >= bigTick) {
   eachLoop();
   counter = 0.0;
 } else {
   counter+=tick;
 }
 delay(tick);
}
