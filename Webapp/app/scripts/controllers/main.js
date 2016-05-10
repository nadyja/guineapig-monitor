'use strict';
angular.module('swinieApp')
.controller("MainCtrl", ["$scope", "thingsSpeakApi", function($scope, thingsSpeakApi) {    
    thingsSpeakApi.getLastSonar()
     	.success(function(result) {
        	var distance = parseFloat(result.feeds[0].field1);
	        $scope.isGrazing = distance < 33.00;
    	})
    }
]);