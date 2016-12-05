/**
 * @author a.demeshko
 * created on 22.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.data-analysis')
    .controller('tempChartCtrl', tempChartCtrl);

  /** @ngInject */
  function tempChartCtrl($element, baConfig, layoutPaths, $scope, $http) {
      var dataProvider = []
      fetchData();

      function fetchData(){
        $http.get("https://city360api.herokuapp.com/v1/reports/5806838a80aad91f54c70c87/1200").
        then(function(resp) {
          if(resp.data.length == 0){
            console.log("nil");
          } else {
            $scope.reports = resp.data;

            for (var i = 0; i<$scope.reports.length; i+=12){
              var date = new Date($scope.reports[i].date);
              var temperature = $scope.reports[i].temperature;
              var obj = {'date': date, 'temperature': temperature};
              dataProvider.unshift(obj);
            }
            initializeChart();

          }
          
        }, function(resp) {
          console.log("Error retrieving data.");
        });
      }

      
      function initializeChart(){
        var layoutColors = baConfig.colors;
        var chart = AmCharts.makeChart('temp-chart', {
          "type": "serial",
          "theme": "light",
          "marginRight": 80,
          "dataProvider": dataProvider,
          "valueAxes": [{
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText,
            gridColor: layoutColors.defaultText,
            "position": "left",
            "title": "Temperature",
            "labelFunction": function(value) {
              return value + "°C";
            }
          }],
          "graphs": [{
              "id": "g1",
              "fillAlphas": 0.4,
              "valueField": "temperature",
              "type": "smoothedLine",
              "title": "Temperature",
              "legendValueText": " [[value]]°C",
               "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]°C</b>"
          }],
          "chartScrollbar": {
              "graph": "g1",
              "scrollbarHeight": 80,
              "backgroundAlpha": 0,
              "selectedBackgroundAlpha": 0.1,
              "selectedBackgroundColor": "#888888",
              "graphFillAlpha": 0,
              "graphLineAlpha": 0.5,
              "selectedGraphFillAlpha": 0,
              "selectedGraphLineAlpha": 1,
              "autoGridCount": true,
              "color": "#AAAAAA"
          },
          "chartCursor": {
              "categoryBalloonDateFormat": "JJ:NN, DD MMMM",
              "cursorPosition": "mouse"
          },
          "categoryField": "date",
          "categoryAxis": {
              "minPeriod": "mm",
              "parseDates": true
          },
          "legend": {
              "useGraphSettings": true,
              "position": "top",
              "color": layoutColors.defaultText
          },
          "export": {
              "enabled": true,
               "dateFormat": "YYYY-MM-DD HH:NN:SS"
          }
      });
      }

//      
      
  }

})();
