/**
 * @author a.demeshko
 * created on 22.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.data-analysis')
    .controller('mosquitoChartCtrl', mosquitoChartCtrl);

  /** @ngInject */
  function mosquitoChartCtrl($element, baConfig, layoutPaths, $scope, $http) {
      var dataProvider = [];
      fetchData();

      function fetchData(){
        $http.get("https://city360api.herokuapp.com/v1/analytics/").
        then(function(resp) {
          if(resp.data.length == 0){
            console.log("nil");
          } else {
            $scope.analytics = resp.data;

            for (var i = 0; i<$scope.analytics.length; i++){
              if ($scope.analytics[i].device_id == "5806838a80aad91f54c70c87"){
                var date = new Date($scope.analytics[i].date);
                var mosquito_risk = $scope.analytics[i].mosquito_risk;
                var obj = {'date': date, 'mosquito_risk': mosquito_risk};
                dataProvider.push(obj);
              }
            }
            initializeChart();

          }
          
        }, function(resp) {
          console.log("Error retrieving data.");
        });
      }
      
      function initializeChart(){
        var layoutColors = baConfig.colors;
        var id = $element[0].getAttribute('id');
        var chart = AmCharts.makeChart('mosquito-chart', {
          "type": "serial",
          "theme": "light",
          "marginRight": 80,
          "dataProvider": dataProvider,
          "valueAxes": [{
            color: layoutColors.defaultText,
            axisColor: layoutColors.defaultText,
            gridColor: layoutColors.defaultText,
            "position": "left",
            "title": "Mosquito Outbreak Risk",
            "labelFunction": function(value) {
              return value + "%";
            }
          }],
          "graphs": [{
              "id": "g1",
              "fillAlphas": 0.4,
              "valueField": "mosquito_risk",
              "type": "smoothedLine",
              "title": "Mosquito Outbreak Risk",
              "legendValueText": " [[value]]%",
               "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]%</b>"
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
