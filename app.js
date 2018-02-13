var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

weatherApp.config(function($routeProvider) {

  $routeProvider

  .when('/', {
    templateUrl: 'pages/search.html',
    controller: 'mainController'
  })

  .when('/results', {
    templateUrl: 'pages/results.html',
    controller: 'secondController'
  })
});

weatherApp.controller('mainController', ['$scope', function($scope){

}]);

weatherApp.controller('secondController', ['$scope', function($scope){

}]);
