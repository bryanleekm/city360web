
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.devices')
      .controller('DeviceMapPageController', DeviceMapPageController);

  /** @ngInject */
  function DeviceMapPageController($timeout, $scope, $http) {
    $scope.devicelist = null;
    $scope.numDevices = 0;
    var map = null;

    function initialize() {
      var mapCanvas = document.getElementById('google-maps');
      var mapOptions = {
        center: new google.maps.LatLng(2.9213, 101.6559),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      
      map = new google.maps.Map(mapCanvas, mapOptions);

      for (var index = 0; index< $scope.numDevices; index++){
        var marker = new google.maps.Marker({
        position: new google.maps.LatLng($scope.devicelist[index].loc.coordinates[1], $scope.devicelist[index].loc.coordinates[0]),
        map: map,
        title: $scope.devicelist[index].name
        });

        var message = "<h2><a href=\"#/devices/info/"+$scope.devicelist[index]._id.$oid + "\">"+$scope.devicelist[index].name+
        "</a></h2><h3>Latest Report:</h3><p>Temperature: "
        +$scope.devicelist[index].latest_report.temperature + "°C</p><p>Humidity: " + $scope.devicelist[index].latest_report.humidity 
        + "%</p><p>Air Pressure: " +$scope.devicelist[index].latest_report.pressure +"mb</p>";

        addInfoWindow(marker, message);
        
      }
    }

    function addInfoWindow(marker, message) {

            var infoWindow = new google.maps.InfoWindow({
                content: message
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker);
            });
        }

    function FetchData(){
      $http.get("http://city360api.herokuapp.com/v1/devices").
      then(function(resp) {
        if(resp.data.length == 0){
          console.log("nil");
        } else {
          $scope.devicelist = resp.data;
          $scope.numDevices = resp.data.length;
          initialize();
        }
        
      }, function(resp) {
        console.log("Error retrieving data.");
      });
    }

    $timeout(function(){
      FetchData();
    }, 300);
  }

})();
