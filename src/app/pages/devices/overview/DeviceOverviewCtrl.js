(function () {
  'use strict';

  angular.module('BlurAdmin.pages.devices')
      .controller('deviceOverviewController', function($scope, $http, $state, toastr, $window) {
    
    $scope.devicelist = [];

    $http.get("http://city360api.herokuapp.com/v1/devices").
      then(function(resp) {
        if(resp.data.length == 0){
          console.log("nil");
        } else {
          $scope.devicelist = resp.data;
          $scope.numDevices = resp.data.length;
        }
        
      }, function(resp) {
        console.log("Error retrieving data.");
      });

      function reloadData(){
        $http.get("http://city360api.herokuapp.com/v1/devices").
      then(function(resp) {
        if(resp.data.length == 0){
          console.log("nil");
        } else {
          $scope.devicelist = resp.data;
          $scope.numDevices = resp.data.length;
        }
        
      }, function(resp) {
        console.log("Error retrieving data.");
      });
      }

      $scope.showStatus = function(index){
        if($scope.devicelist[index].latest_report == null){
          return "Offline";
        }

        if ((Date.now()-Date.parse($scope.devicelist[index].latest_report.date))<300000){
          return "Online";
        }else{
          return "Offline";
        }
        
      }

      $scope.showLastTransmitted = function(index){
        if($scope.devicelist[index].latest_report == null){
          return "No transmission";
        }
        var seconds = Math.floor((new Date() - Date.parse($scope.devicelist[index].latest_report.date)) / 1000);

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

      $scope.addDevice = function(){
        $state.go('devices.new');
      }

      $scope.showDeviceInfo = function(index){
        $state.go('devices.info', {'device_id':$scope.devicelist[index]._id.$oid});
      }

      $scope.removeDevice = function(index){
        $http.delete("http://city360api.herokuapp.com/v1/devices/" + $scope.devicelist[index]._id.$oid)
        .success(function (data, status, headers) {
          toastr.success('Device deleted succesfully!', 'Success!', {
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
          });
          reloadData();
        })
        .error(function (data, status, header, config) {
          toastr.error('Could not delete device!', 'Error', {
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
          });
        });
      }
  });

})();
