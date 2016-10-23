#include <stdlib.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <LiquidCrystal.h>
#include "../lib/config.h"
#include "../lib/wifi.h"
#include "../lib/lcd.h"

// WIFI config
int yellowTX    = 8;
int greenRX     = 9;
Wifi wifi (greenRX, yellowTX, THINGS_SPEAK_WRITE_KEY, THINGS_SPEAK_IP);

// LCD config
int LCDRS       = 7;
int LCDEnable   = 6;
int LCDD4       = 5;
int LCDD5       = 4;
int LCDD6       = 3;
int LCDD7       = 2;
LCDDisplay display(LCDRS, LCDEnable, LCDD4, LCDD5, LCDD6, LCDD7);

float getSensor() {
  return 5.0;
}

void setup()
{
  wifi.init();
  display.init();
}

void loop() {
 float temp=getSensor();
 display.clear();
 display.printFloat(temp, TOP_LEFT);
 wifi.sendWifi(temp);
 delay(15000);
}
