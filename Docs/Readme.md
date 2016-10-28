
##Detecting a Pig
The basic function of a guinea pig is eating hay, so I started with that. The easiest way to recognize if a guinea pig is eating hay is to put surveillance on their hay rack. I used a distance sensor HC-SR04
How it works is it emits an ultrasound ping and measures the time until it's echo reaches the sensor back. The resulting output is a high level signal proportional to the distance.



the distance can be thus calculated

distance = (highleveltime * soundvelocity)/2
with the sound velocity in air being 340 m/s

The usual distance to the cage's wall is 33 cm. If the sensor output is something less it indicates that a guinea pig is present and most likely is grazing.



##Connecting the sensor
To detect a grazing guinea pig I built this system:



With the code:
```
    #include <stdlib.h>

    //pin numbers
    int Trig = 9;
    int Echo = 8;
    int pigLed = 7;

    float wallDistance = 33.0;
    float soundVelocity = 34 / 1000;

    void setup()
    {
      pinMode(Trig, OUTPUT);
      pinMode(Echo, INPUT);
      pinMode(pigLed, OUTPUT);    
    }

    void loop() {
     if(getDistance() < wallDistance) {
      digitalWrite(pigLed, HIGH);
     } else {
      digitalWrite(pigLed, LOW);
     }
     delay(15000);
    }

    float getDistance ()
    {
      // set a high signal for 10 uS - initializing the echo
      digitalWrite(Trig, HIGH);       
      delayMicroseconds(10);
      digitalWrite(Trig, LOW);
      // mesure the response offset
      long highleveltime = pulseIn(Echo, HIGH);
      float distance =  (highleveltime * soundVelocity) / 2;
      // distance in cm
      return distance;                
    }
```
In the loop it measures the distance every 15 seconds and lights the green led when a pig is present.

##Wi-Fi
Having a smart sensor isn't enough to call this system an Internet of Things device. For that we need Internet. The easiest (and cheapest) way to connect Arduino to the web is the small ESP8266 module.

It's only fault is its operating voltage of 3.3V. Powering it is not a problem for Arduino Uno as it has a dedicated 3.3V pin. But conflicting opinions run around with whether the ESP8266 can tolerate 5V on it's logical RX and TX pins. I'm going with this documentation quote

All digital IO pins are protected from over-voltage with a snap-back circuit connected between the pad and ground. The snap back voltage is typically about 6V, and the holding voltage is 5.8V. This provides protection from over-voltages and ESD. The output devices are also protected from reversed voltages with diodes.

However it's generally not advised to keep using 5V in production.

#programming ESP8266

To start using the module it first needs to be configured. ESP8266 can be programmed through the serial interface. For that Arduino Uno's RX and TX pins can be used.

With the Arduino connected to the computer the RX and TX pins transmit the commands directly from the Serial Monitor (Ctrl+Shift+M).

ESP8266 comes with a set of AT commands. Let's try them!

Try typing AT and enter in the Serial Monitor. Expected answer is an OK. Different software versions of ESP8266 come with a different baud rate set as a default so before any programming you need to try out a few settings of the monitor. Mine worked with 115200 baud.


First we need to set the Wi-Fi mode:

``AT+CWMODE=1``
This will make ESP8266 work as a web client

Next to list the available networks:

``AT+CWLAP``
And to connect to a chosen network:

``AT+CWJAP="[ssid]","[password]"``
Now ESP8266 will connect to this network each time it starts. You can check it's IP by:

``AT+CIFSR``
At last, set the baudrate for 115200

``AT+CIOBAUD=115200``
This will prevent trouble with debugging via Serial Monitor and communicating with the Wi-Fi module at the same time.

And that's it - ESP8266 is ready to use!

#connecting ESP8266

Now that the programming is finished, the module's RX and TX pins will be used for software serial communication with Arduino. Let's them to Arduino normal pins 2 and 3.


#The data server
I programmed ESP8266 to work as a web client, which means it will need a server to transmit it's data to. The simplest way is to send it to the cloud via https://thingspeak.com/. A short registration process allows you to create channels for different sensors. The only restriction: do not post data in less than 15s intervals.

Creating a channel gives you read and write keys:



Let's use the write key in the application
```
    #include <stdlib.h>
    #include <SoftwareSerial.h>

    int Trig    = 9;
    int Echo    = 8;
    int pigLed  = 7;
    int rxPin   = 2;
    int txPin   = 3;

    String apiIP = "184.106.153.149";
    String apiKey = "[Thingspeak API write key]";
    SoftwareSerial softwareSerial(rxPin,txPin);
    float wallDistance = 33.0;
    float soundVelocity = 34 / 1000;

    void setup()
    {
      pinMode(Trig, OUTPUT);
      pinMode(Echo, INPUT);
      pinMode(pigLed, OUTPUT);  
      softwareSerial.begin(115200);
      softwareSerial.println("AT+RST");  
      delay(2000);
    }

    void loop() {
     float distance=getDistance();
     if(distance<33.00) {
      digitalWrite(pigLed, HIGH);
     } else {
      digitalWrite(pigLed, LOW);
     }
     delay(15000);
    }

    float getDistance ()
    {
      digitalWrite(Trig, HIGH);
      delayMicroseconds(10);
      digitalWrite(Trig, LOW);
      long highleveltime = pulseIn(Echo, HIGH);
      float distance =  (highleveltime * soundVelocity) / 2;
      return distance;
    }

    void sendData(float value) {  
      //connect to the thingspeak server
      String cmd = "AT+CIPSTART=\"TCP\",\"";
      cmd+= apiIP;
      cmd+"\",80";
      softwareSerial.println(cmd);  
      delay(1000);
      if(softwareSerial.find("Error")){
        return;
      }
      // prepare GET string
      char buf[16];
      String valueString=dtostrf(value,0,2,buf);
      String getStr = "GET /update?api_key=";
      getStr += apiKey;
      getStr +="&field1=";
      getStr += String(valueString);
      getStr += "\r\n\r\n";
      // send data length
      cmd = "AT+CIPSEND=";
      cmd += String(getStr.length());
      softwareSerial.println(cmd);
      delay(1000);
      // send data or close the connection
      if(softwareSerial.find(">")){
        softwareSerial.print(getStr);
      } else{
        cmd="AT+CIPCLOSE";
        softwareSerial.println(cmd);
      }
    }
```
Powering it up we can observe the data being collected.



#The webapp
The last step was creating a webapp that would answer the big question - is a guinea pig grazing?

For this I generated a simple Angular app using Yeoman's generator-angular.

I created a view, controller and a service.

scripts/controllers/MainCtrl.js
```
'use strict';
angular.module('swinieApp')
.controller("MainCtrl", ["$scope", "thingsSpeakApi", function($scope, thingsSpeakApi) {    
    thingsSpeakApi.getLastSonar()
      .success(function(result) {
          var distance = parseFloat(result.feeds[0].field1);
          $scope.isGrazing = distance < 33.00;
      })
    }
)];
```
scripts/services/ThingsSpeakApi.js
```
'use strict';
angular.module('swinieApp')
  .service('thingsSpeakApi', function ($http) {
    return {
            getLastSonar: function() {
                return $http.get("http://api.thingspeak.com/channels/69167/feeds.json?results=1");
            }
    };
  });
```
views/main.html
```
<div class="container">
<h3>Are pigs grazing?</h3>
<div class="answer">
    <h1 ng-if="isGrazing">
        Yes
        <small>a guinea pig is now gazing</small>
    </h1>
    <h1 ng-if="!isGrazing">
        No
        <small>guinea pigs are now digesting</small>
    </h1>
</div>
</div>
```
It reads the last data from Thingspeak and interprets them accordingly


And thus my pigs are IoT enabled!

#What next?
With the communication implemented it's now very easy to change the sensors. After a day's experiment I've stopped pinging the pigs with ultrasounds, and moved on to less invasive measuring the temperature of their hammock to detect if a pig is relaxing.



Adding more sensors and logic is just a matter of time.
