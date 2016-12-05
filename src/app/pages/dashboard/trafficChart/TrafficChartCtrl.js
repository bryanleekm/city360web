/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('TrafficChartCtrl', TrafficChartCtrl);

  /** @ngInject */
  function TrafficChartCtrl($scope, baConfig, colorHelper, $http) {

    $scope.devicesConnected = 0;
    $scope.devicesDisconn = 0;

    $http.get("http://city360api.herokuapp.com/v1/devices").
      then(function(resp) {
        if(resp.data.length == 0){
          console.log("empty");
        } else {
          $scope.devicelist = resp.data;
          $scope.numDevices = resp.data.length;
          var index = 0;
          for(index =0; index<$scope.numDevices; index++){
            if($scope.devicelist[index].latest_report!=null){
              console.log(Date.parse($scope.devicelist[index].latest_report.date));
              console.log(Date.now());
              if ((Date.now()-Date.parse($scope.devicelist[index].latest_report.date))<300000){
                $scope.devicesConnected++;
              } else {
                $scope.devicesDisconn++;
              }
            } else {
              $scope.devicesDisconn++;
            }
            
          }

          $scope.transparent = baConfig.theme.blur;
          var dashboardColors = baConfig.colors.dashboard;
          $scope.doughnutData = [
            {
              value: $scope.devicesConnected,
              color: dashboardColors.silverTree,
              highlight: colorHelper.shade(dashboardColors.silverTree, 15),
              label: 'Online',
              percentage: (Math.round($scope.devicesConnected/$scope.numDevices*100, 2)),
              order: 1,
            }, {
              value: $scope.devicesDisconn,
              color: dashboardColors.blueStone,
              highlight: colorHelper.shade(dashboardColors.blueStone, 15),
              label: 'Offline',
              percentage: (Math.round($scope.devicesDisconn/$scope.numDevices*100, 2)),
              order: 2,
            }
          ];

    var ctx = document.getElementById('chart-area').getContext('2d');
    window.myDoughnut = new Chart(ctx).Doughnut($scope.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout : 64,
      responsive: true
    });
        }
        
      }, function(resp) {
        console.log("Error retrieving data.");
    });

    
  }
})();