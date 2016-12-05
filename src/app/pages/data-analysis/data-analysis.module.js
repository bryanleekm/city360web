(function () {
  'use strict';

  var myapp = angular.module('BlurAdmin.pages.data-analysis', ['toastr'])
      .config(routeConfig);

      

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('data-analysis', {
          url: '/data-analysis',
          title: 'Data Visualization',
          templateUrl: 'app/pages/data-analysis/dataanalysis.html',
          abstract: true,
          sidebarMeta: {
            order: 150,
            icon: 'ion-stats-bars'
          },
        })

        .state('data-analysis.temperature', {
          url: '/temperature',
          title: 'Temperature Chart',
          templateUrl: 'app/pages/data-analysis/temperature/tempChart.html',
          controller: 'tempChartCtrl',
          sidebarMeta: {
            order: 0
          },
        })

        .state('data-analysis.humidity', {
          url: '/humidity',
          title: 'Humidity Chart',
          templateUrl: 'app/pages/data-analysis/humidity/humidityChart.html',
          controller: 'humidityChartCtrl',
          sidebarMeta: {
            order: 100
          },
        })

        .state('data-analysis.pressure', {
          url: '/pressure',
          title: 'Pressure Chart',
          templateUrl: 'app/pages/data-analysis/pressure/pressureChart.html',
          controller: 'pressureChartCtrl',
          sidebarMeta: {
            order: 200
          },
        })

        .state('data-analysis.mosquito', {
          url: '/mosquito',
          title: 'Mosquito Risk Chart',
          templateUrl: 'app/pages/data-analysis/mosquito/mosquitoChart.html',
          controller: 'mosquitoChartCtrl',
          sidebarMeta: {
            order: 300
          },
        });
        
  }

})();