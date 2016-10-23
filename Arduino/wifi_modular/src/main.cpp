#include <stdlib.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <LiquidCrystal.h>
#include <string.h>
#include "../lib/config.h"
#include "../lib/wifi.h"
#include "../lib/lcd.h"
#include "../lib/scale.h"

// SCALE config
#define DOUT        11
#define CLK         10
#define CALIBRATION  800.0
Scale scale(DOUT, CLK, CALIBRATION);

// WIFI config
#define yellowTX     8
#define greenRX      9
Wifi wifi (greenRX, yellowTX, THINGS_SPEAK_WRITE_KEY, THINGS_SPEAK_IP);

// LCD config
#define LCDRS        7
#define LCDEnable    6
#define LCDD4        5
#define LCDD5        4
#define LCDD6        3
#define LCDD7        2
LCDDisplay lcd(LCDRS, LCDEnable, LCDD4, LCDD5, LCDD6, LCDD7);

void setup()
{
  lcd.init();
  lcd.print("INIT", BOTTOM_RIGHT);
  //scale.init();
  wifi.init();

}

float counter = 0.0;
float step = 1000.0;
void loop() {
 lcd.printFloat(counter, BOTTOM_RIGHT);
// float weight=scale.read();
float weight = 0.0;
 lcd.clear();
 lcd.printFloat(weight, TOP_LEFT);
 if(counter >= 15000.0) {
   lcd.print("SEND", BOTTOM_RIGHT);
   wifi.sendWifi(weight);
   lcd.print("OK", BOTTOM_RIGHT);
   counter = 0.0;
 } else {
   counter+=step;

 }
 delay(step);
}
