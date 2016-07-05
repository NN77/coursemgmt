import 'angular-material/angular-material.css!'
import 'app.css!'

import angular from 'angular'
import route from 'angular-route'
import material from 'angular-material'
import moment from 'moment'

import courses from 'courses/Courses'
import users from 'users/Users';

angular
  .element( document )
  .ready( function() {

    let appName = 'coursemgmtApp';

    let body = document.getElementsByTagName("body")[0];
    let app  = angular
          .module( appName, [ 'ngRoute', material, courses, users ] )
          .config(function($routeProvider, $mdThemingProvider, $mdIconProvider, $mdDateLocaleProvider){
            $routeProvider.
              when('/courses', {
                templateUrl: 'src/courses/view/courses.html'
              }).
              when('/users', {
                templateUrl: 'src/users/view/users.html'
              }).
              otherwise('/users');

            $mdIconProvider
                .icon("menu", "./assets/svg/menu.svg", 24);

            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey')
                .accentPalette('red');
                $mdDateLocaleProvider.formatDate = function(date) {
                  return date ? moment(date).format('DD-MM-YYYY') : '';
                };

          })
          .controller('AppController', [ '$mdSidenav', '$mdBottomSheet', '$timeout', '$log', '$location',
                 AppController
          ]);

          function AppController( $mdSidenav, $mdBottomSheet, $timeout, $log, $location ) {
            var self = this;

            self.route            = route;
            self.toggleList       = toggleList;

            function route(path) {
              $location.path(path);
            }

            function toggleList() {
              $mdSidenav('left').toggle();
            }
          }

    angular.bootstrap( body, [ app.name ], { strictDi: false })

  });
