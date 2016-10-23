#include "config.h"
#include <stdlib.h>
#include <string.h>
#include "module_LCDDisplay.h"
#include "module_Scale.h"
#include "module_Wifi.h"

String apiKey = THINGS_SPEAK_WRITE_KEY;

LCDDisplay screen;
Sensor distanceSensor(A0, 10);


void setup() {
  Serial.begin(9600);
  screen.init();
}

void loop() {
    screen.clear();
    screen.printFloat(distanceSensor.getValue(), TOP_LEFT);
    if(distanceSensor.isPig()) {
      screen.print("PIG", TOP_RIGHT);
    }
    if(distanceSensor.shouldNotify()) {
      screen.print("sending", BOTTOM_LEFT);
      }
    delay(1000);
}


 

