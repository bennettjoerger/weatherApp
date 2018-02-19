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

weatherApp.controller('secondController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService){

  $scope.city = cityService.city;

  $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast?q={{$scope.city}},uk&appid=7dd407eddaec652ef552be05f83248ab', {callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }});

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2 });

    $scope.convertToFahrenheit = function (degK) {
      return Math.round((1.8 * (degK - 273)) + 32);

    }

    $scope.convertToDate = function(dt){

      return new Date(dt * 1000);
    }


}]);
