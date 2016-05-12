#include <LiquidCrystal.h>

#define TOP_LEFT 1
#define TOP_RIGHT 2
#define BOTTOM_LEFT 3
#define BOTTOM_RIGHT 4

int LCDRS       = 2;
int LCDEnable   = 3;
int LCDD4       = 4;
int LCDD5       = 5;
int LCDD6       = 6;
int LCDD7       = 7;
LiquidCrystal lcd(LCDRS, LCDEnable, LCDD4, LCDD5, LCDD6, LCDD7);



class LCDDisplay {
	public:
		LCDDisplay() {
		  
		}
		void init() {
			lcd.begin(16, 2);
		}
		void printFloat(float value,int pos) {
			char outstr[15];
			 dtostrf(value,7, 0, outstr);
			 print(outstr,pos);
		}
   void clear() {
        lcd.setCursor(0, 0);
        lcd.print("                ");
        lcd.setCursor(0, 1);
        lcd.print("                ");
   }
		void print(String text, int pos) {
		  if(pos==TOP_LEFT) {
		    lcd.setCursor(0, 0);
		    lcd.print("        ");
		    lcd.setCursor(0, 0);
		    lcd.print(text);
		  } 
		  if(pos==TOP_RIGHT) {
		    lcd.setCursor(8, 0);
		    lcd.print("        ");
		    lcd.setCursor(16-text.length(), 0);
		    lcd.print(text);
		  } 
		  if(pos==BOTTOM_LEFT) {
		    lcd.setCursor(0, 1);
		    lcd.print("        ");
		    lcd.setCursor(0, 1);
		    lcd.print(text);
		  } 
		  if(pos==BOTTOM_RIGHT) {
		    lcd.setCursor(8, 1);
		    lcd.print("        ");
		    lcd.setCursor(16-text.length(), 1);
		    lcd.print(text);
		  } 
		}
};
