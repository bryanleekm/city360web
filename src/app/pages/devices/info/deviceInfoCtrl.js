(function () {
  'use strict';

  angular.module('BlurAdmin.pages.devices')
      .controller('deviceInfoController', deviceInfoController);

  /** @ngInject */
  function deviceInfoController($timeout, $scope, $http, $stateParams, baConfig, baUtil) {
    $scope.chartcolor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
    $scope.device = null;
    var map = null;

    function initialize() {
      var mapCanvas = document.getElementById('google-maps');
      var mapOptions = {
        center: new google.maps.LatLng($scope.device.loc.coordinates[1], $scope.device.loc.coordinates[0]),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      
      map = new google.maps.Map(mapCanvas, mapOptions);
      
      var marker = new google.maps.Marker({
      position: new google.maps.LatLng($scope.device.loc.coordinates[1], $scope.device.loc.coordinates[0]),
      map: map,
      title: $scope.device.name
      });

      var infoWindow = new google.maps.InfoWindow({
          content: "<p>Device Coordinates: (" + $scope.device.loc.coordinates[0] + ", " + $scope.device.loc.coordinates[1] + ")</p>"
      });

      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
      });
      
    }

    function FetchData(){
      $http.get("http://city360api.herokuapp.com/v1/devices/" + $stateParams.device_id).
      then(function(resp) {
        if(resp.data.length == 0){
          console.log("nil");
        } else {
          $scope.device = resp.data;
          initialize();
          loadPieCharts();
        }
        
      }, function(resp) {
        console.log("Error retrieving data.");
      });
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        //updatePieCharts();
      });
    }

    $scope.showStatus = function(){
        if($scope.device.latest_report == null){
          return "Offline";
        }

        if ((Date.now()-Date.parse($scope.device.latest_report.date))<300000){
          return "Online";
        }else{
          return "Offline";
        }
        
      }

      $scope.showLastTransmitted = function(){
        if($scope.device.latest_report == null){
          return "No transmission";
        }
        var seconds = Math.floor((new Date() - Date.parse($scope.device.latest_report.date)) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years ago";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months ago";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
      }


    $timeout(function(){
      FetchData();
    }, 100);
  }

})();
