/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil, $http) {

    $scope.chartcolor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

    $http.get("http://city360api.herokuapp.com/v1/devices").
      then(function(resp) {
        
        if(resp.data.length == 0){
          console.log("nothing");
        } else {
          $scope.devicelist = resp.data;
          $scope.numDevices = resp.data.length;
          loadPieCharts();
          
        }
        
      }, function(resp) {
        console.log("Error retrieving data.");
      });


    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        console.log("jere");
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

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
      });
    }

    $timeout(function () {
      loadPieCharts();
      //updatePieCharts();
    }, 1000);
  }
})();