#include <LiquidCrystal.h>

class Sensor {
  int pin;
  int value;
  float threshold;
  bool pigState;
  bool state_changed;

  private: 
    void setState(){
      bool prevState=pigState;
      pigState=(value>threshold);
      state_changed=(pigState!=prevState);
    }
    void readValue() {
      value=analogRead(pin);
      setState();
    }
  public:
    Sensor(int _pin, float _threshold) {
      pin=_pin;
      threshold=_threshold;  
    }

    float getValue() {
      readValue();
      return value;
    }
    bool isPig() {
      return pigState;
    }
    bool shouldNotify() {
      return state_changed;
    }

};
