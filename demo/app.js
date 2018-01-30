'use strict';

angular.module('app', [
    'ui.router',
    'ngAria',
    'ngResource',
    'ngEsc'
  ]).run(function($rootScope, $timeout, $state){

  $rootScope.window = window;
  $rootScope.$state = $state;
});
