var weatherApp = angular.module('weatherApp', ['$sceDelegateProvider','ngRoute', 'ngResource'])
.config(function  ($sceDelegateProvider,$routeProvider){

  $sceDelegateProvider.resourceUrlWhitelist([
  'self',
  'http://api.openweathermap.org']);


  $routeProvider

  .when('/', {
    templateUrl: 'pages/search.html',
    controller: 'mainController'
  })

  .when('/results', {
    templateUrl: 'pages/results.html',
    controller: 'secondController'
  })

  .when('/results/:days', {
    templateUrl: 'pages/results.html',
    controller: 'secondController'
  })
});


weatherApp.service('cityService', function(){

  this.city = "New York, NY";

});

weatherApp.controller('mainController', ['$scope', 'cityService', '$routeParams', function($scope, cityService, $routeParams){

  $scope.city = cityService.city;

  $scope.days = $routeParams.days || 2;

  $scope.$watch('city', function(){
    cityService.city = $scope.city;
  });

}]);

weatherApp.controller('secondController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService){

  $scope.city = cityService.city;

  $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast?q={{$scope.city}},uk&appid=7dd407eddaec652ef552be05f83248ab', {callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });

    $scope.convertToFahrenheit = function (degK) {
      return Math.round((1.8 * (degK - 273)) + 32);

    }

    $scope.convertToDate = function(dt){

      return new Date(dt * 1000);
    };


}]);

weatherApp.directive("weatherReport", function(){

  return {
    restrict: 'E',
    templateUrl: 'directives/weatherReport.html',
    scope: {
      weatherDay: "=",
      convertToStandard: "&",
      convertToDate: "&",
      dateFormat: "&"


    }
  }

})
