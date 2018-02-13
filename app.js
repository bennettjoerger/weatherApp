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

weatherApp.service('cityService', function(){

  this.city = "New York, NY";
});

weatherApp.controller('mainController', ['$scope', 'cityService', function($scope, cityService){

  $scope.city = cityService.city;

  $scope.$watch('city', function(){
    cityService.city = $scope.city;
  });


}]);

weatherApp.controller('secondController', ['$scope','cityService', function($scope, cityService){

  $scope.city = cityService.city;

}]);
