(function () {
  'use strict';

  var myapp = angular.module('BlurAdmin.pages.devices', ['toastr'])
      .config(routeConfig);

      

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('devices', {
          url: '/devices',
          title: 'Devices',
          templateUrl: 'app/pages/devices/devices.html',
          abstract: true,
          sidebarMeta: {
            order: 0,
            icon: 'ion-network'
          },
        })

        .state('devices.overview', {
          url: '/overview',
          templateUrl: 'app/pages/devices/overview/overview.html',
          title: 'Device Overview',
          sidebarMeta: {
            order: 50
          }, controller:'deviceOverviewController'
        })

        .state('devices.map', {
          url: '/map',
          templateUrl: 'app/pages/devices/map/device-map.html',
          title: 'Device Map',
          sidebarMeta: {
            order: 100
          }, controller:'DeviceMapPageController'
        })

        .state('devices.info', {
          url: '/info/:device_id',
          templateUrl: 'app/pages/devices/info/device-info.html',
          controller: 'deviceInfoController',
          title: 'Device Info',
        })

        .state('devices.new', {
          url: '/new',
          templateUrl: 'app/pages/devices/new/new.html',
          controller: 'addNewDeviceController',
          title: 'Add New Device',
        });
  }

})();