
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.high-risk-areas')
      .controller('HighRiskAreasController', HighRiskAreasController);

  /** @ngInject */
  function HighRiskAreasController(baConfig, $timeout, layoutPaths, $scope, $http) {
    var map;
    var color;
    $scope.warning = null;
    $scope.serious = null;
    $scope.warningCount = 0;
    $scope.seriousCount = 0;

    function initializeMap(){
        var mapCanvas = document.getElementById('map-bubbles');
          var mapOptions = {
            center: new google.maps.LatLng(2.9213, 101.6559),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          
        map = new google.maps.Map(mapCanvas, mapOptions);
        var bounds = new google.maps.LatLngBounds();

        // Construct the circle for each value in citymap.
        // Note: We scale the area of the circle based on the population.
        console.log($scope.analytics);
        for (var i = 0; i< $scope.analytics.length; i++) {

          // Add the circle for this city to the map.
           if ($scope.analytics[i].latest_analytics != null){
               if ($scope.analytics[i].latest_analytics.mosquito_risk>70){
                    color = "#FF0000";
                    if($scope.serious==null) {
                        $scope.serious = $scope.analytics[i].name;
                        $scope.seriousCount++;
                    } else {
                        $scope.serious+= ", " + $scope.analytics[i].name;
                        $scope.seriousCount++;
                    }
                } else if ($scope.analytics[i].latest_analytics.mosquito_risk>40){
                    color = "#FE8700";
                    if($scope.warning==null) {
                        $scope.warning = $scope.analytics[i].name;
                        $scope.warningCount++;
                    } else {
                        $scope.warning+= ", " + $scope.analytics[i].name;
                        $scope.warningCount++;
                    }
                } else {
                    color = "#00FF00";
                }

              var center = {'lat': $scope.analytics[i].loc.coordinates[1], 'lng': $scope.analytics[i].loc.coordinates[0]};
              bounds.extend(center);
              var cityCircle = new google.maps.Circle({
                strokeColor: color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: color,
                fillOpacity: 0.35,
                map: map,
                center: center,
                radius: 2000,
                clickable: true
              });

              var message = "<h3>" +$scope.analytics[i].name + "</h3><li><h5>"  
              + $scope.analytics[i].latest_analytics.mosquito_risk + "% chance of mosquito outbreak</h5></li>";

              addInfoWindow(cityCircle, center, message);

            }
        }
        map.fitBounds(bounds);

    }

    function addInfoWindow(cityCircle, center, message) {

            var infowindow = new google.maps.InfoWindow({
                content: message
            });

            google.maps.event.addListener(cityCircle, 'mouseover', function(ev) {
                // alert(infowindow.content);
                infowindow.setPosition(cityCircle.getCenter());
                infowindow.open(map);
            });

            google.maps.event.addListener(cityCircle, 'mouseout', function(ev) {
                infowindow.close(map);
            });
        }

    function fetchData(){  
        $http.get("http://city360api.herokuapp.com/v1/devices").
          then(function(resp) {
            if(resp.data.length == 0){
              console.log("nil");
            } else {
              $scope.analytics = resp.data;
              initializeMap();
              //map.write('map-bubbles');
            }
            
          }, function(resp) {
            console.log("Error retrieving data.");
          });
    
    }

    $timeout(function() {
      fetchData();
    }, 100);
  }

})();
