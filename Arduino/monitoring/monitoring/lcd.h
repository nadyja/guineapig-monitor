#include <stdlib.h>
#include <Arduino.h>
#include <LiquidCrystal.h>
#include <string.h>

#define TOP_LEFT 1
#define TOP_RIGHT 2
#define BOTTOM_LEFT 3
#define BOTTOM_RIGHT 4

LiquidCrystal* liquidCristal;

class LCDDisplay {
  private:

	public:
		LCDDisplay(int rs, int enable, int d4, int d5, int d6, int d7) {
      liquidCristal = new LiquidCrystal(rs, enable, d4, d5, d6, d7);
		}

		void init() {
			(*liquidCristal).begin(16, 2);
		}
		void printFloat(float value,int pos) {
			char outstr[15];
			 dtostrf(value,7, 0, outstr);
			 print(outstr,pos);
		}
    void printInt(int value,int pos) {
    }
   void clear() {
        (*liquidCristal).setCursor(0, 0);
        (*liquidCristal).print("                ");
        (*liquidCristal).setCursor(0, 1);
        (*liquidCristal).print("                ");
   }
		void print(String text, int pos) {
		  if(pos==TOP_LEFT) {
		    (*liquidCristal).setCursor(0, 0);
		    (*liquidCristal).print("        ");
		    (*liquidCristal).setCursor(0, 0);
		    (*liquidCristal).print(text);
		  }
		  if(pos==TOP_RIGHT) {
		    (*liquidCristal).setCursor(8, 0);
		    (*liquidCristal).print("        ");
		    (*liquidCristal).setCursor(16-text.length(), 0);
		    (*liquidCristal).print(text);
		  }
		  if(pos==BOTTOM_LEFT) {
		    (*liquidCristal).setCursor(0, 1);
		    (*liquidCristal).print("        ");
		    (*liquidCristal).setCursor(0, 1);
		    (*liquidCristal).print(text);
		  }
		  if(pos==BOTTOM_RIGHT) {
		    (*liquidCristal).setCursor(8, 1);
		    (*liquidCristal).print("        ");
		    (*liquidCristal).setCursor(16-text.length(), 1);
		    (*liquidCristal).print(text);
		  }
		}
};
