/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.maps')
      .controller('GmapPageCtrl', GmapPageCtrl);

  /** @ngInject */
  function GmapPageCtrl($timeout) {
    function initialize() {
      var mapCanvas = document.getElementById('google-maps');
      var mapOptions = {
        center: new google.maps.LatLng(2.9213, 101.6559),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      
      var map = new google.maps.Map(mapCanvas, mapOptions);
      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(3.0567333, 101.5851192),
          map: map,
          title: 'Subang Jaya',
          infoWindow: {content: '<p>Subang Jaya</p>'}
        });

      var marker3 = new google.maps.Marker({
          position: new google.maps.LatLng(2.923739, 101.657858),
          map: map,
          title: 'Cyber 6, Cyberjaya',
          infoWindow: {content: '<p>Cyber 6, Cyberjaya</p>'},
          click: function(e) {
            this.infoWindow.open(this.map, this);
          }
        });

      var infowindow = new google.maps.InfoWindow({
      content: "Cyber 6, Cyberjaya"
    });
      marker3.addListener('click', function() {
        infowindow.open(map, marker3);
      });

      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(2.959692, 101.67947),
          map: map,
          title: 'Cyber 11, Cyberjaya',
          infoWindow: {content: '<p>Cyber 11, Cyberjaya</p>'},
          click: function(e) {
            this.infoWindow.open(this.map, this);
          }
        });
    }

    $timeout(function(){
      initialize();
    }, 100);
  }

})();
