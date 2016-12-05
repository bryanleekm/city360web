(function () {
  'use strict';

  angular.module('BlurAdmin.pages.devices')
      .controller('addNewDeviceController', function($scope, $http, toastr, $state) {

      $scope.AddDevice = function(){
        var postObject = new Object();
        postObject.name = $scope.data.name;
        postObject.longitude = parseFloat($scope.data.longitude);
        postObject.latitude = parseFloat($scope.data.latitude);

        console.log($scope.data);

        var req = {
          method: 'POST',
          url: 'http://city360api.herokuapp.com/v1/devices',
          data: postObject
        };

        $http(req).success(function(resp) {
          toastr.success('Device added succesfully!', 'Success!', {
          "autoDismiss": false,
          "positionClass": "toast-bottom-full-width",
          "type": "success",
          "timeOut": "5000",
          "extendedTimeOut": "2000",
          "allowHtml": false,
          "closeButton": false,
          "tapToDismiss": true,
          "progressBar": false,
          "newestOnTop": true,
          "maxOpened": 0,
          "preventDuplicates": false,
          "preventOpenDuplicates": false
          })

          $state.go('devices.overview');
        }).error(function(err) {
          toastr.error('Could not add device!', 'Error', {
          "autoDismiss": false,
          "positionClass": "toast-top-right",
          "type": "error",
          "timeOut": "5000",
          "extendedTimeOut": "2000",
          "allowHtml": false,
          "closeButton": false,
          "tapToDismiss": true,
          "progressBar": false,
          "newestOnTop": true,
          "maxOpened": 0,
          "preventDuplicates": false,
          "preventOpenDuplicates": false
        })
          
        })
      }

      
  });

})();
