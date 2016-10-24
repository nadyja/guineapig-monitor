#include <stdlib.h>
#include <Arduino.h>
#include "HX711.h"

HX711* hx711;

class Scale {
  float calibration_factor;
  private:

  public:
    Scale(int dout, int clk, float _calibration_factor) {
      hx711 = new HX711(dout, clk);
      calibration_factor = _calibration_factor;
    }

    void init() {
      (*hx711).set_scale(calibration_factor); //Ustawienie kalibracji
      (*hx711).tare();                        //Zerowanie wskazania na początek
    }

    float read() {
      float reading = (*hx711).get_units();
      // if(reading>-10.0 && reading<10.0) {
      //  (*hx711).tare();
      //  return 0.0;
      // }
      return reading;
    }
};
