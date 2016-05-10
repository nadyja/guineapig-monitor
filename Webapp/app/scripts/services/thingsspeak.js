'use strict';
angular.module('swinieApp')
  .service('thingsSpeakApi', function ($http) {
		return {
            getLastSonar: function() {
                return $http.get("http://api.thingspeak.com/channels/69167/feeds.json?results=1");
            }	
		};
  });
