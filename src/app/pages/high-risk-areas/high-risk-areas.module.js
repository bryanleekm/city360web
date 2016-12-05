(function () {
  'use strict';

  var myapp = angular.module('BlurAdmin.pages.high-risk-areas', ['toastr'])
      .config(routeConfig);

      

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('high-risk-areas', {
          url: '/highriskareas',
          title: 'High-risk Areas',
          templateUrl: 'app/pages/high-risk-areas/highriskareas.html',
          controller: 'HighRiskAreasController',
          sidebarMeta: {
            order: 100,
            icon: 'ion-alert'
          },
        });
  }

})();