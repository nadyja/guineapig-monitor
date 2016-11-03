#include "HX711.h"
#include "./pins.h"

HX711 scale(whiteDOUT, greenCLK);

float calibrationFactor = 800.0;

void setup() {
  Serial.begin(9600);
  scale.set_scale();
  scale.tare();

  long zero_factor = scale.read_average();
  Serial.print("Zero factor: ");
  Serial.println(zero_factor);
}

void loop() {
  scale.set_scale(calibrationFactor);

  Serial.print("Odczyt: ");
  Serial.print(scale.get_units(), 1);
  Serial.print(" g");
  Serial.print("       Wspolczynnik_kalibracji: ");
  Serial.print(calibrationFactor);
  Serial.println();

  if(Serial.available())
  {
    char temp = Serial.read();
    if(temp == '+' || temp == 'a')
      calibrationFactor += 10;
    else if(temp == '-' || temp == 'z')
      calibrationFactor -= 10;
  }
  delay(100);
}
