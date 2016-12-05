/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.devices')
      .directive('devicePieChart', devicePieChart);

  /** @ngInject */
  function devicePieChart() {
    return {
      restrict: 'E',
      controller: 'deviceInfoController',
      templateUrl: 'app/pages/devices/info/devicePieChart.html'
    };
  }
})();