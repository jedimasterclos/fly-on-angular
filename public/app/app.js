var app = angular.module('AirplaneApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('airplanes', {
      url: '/',
      controller: 'MainCtrl',
      templateUrl: '/views/planes.html'
    })
     .state('editplanes', {
      url: '/airplanes/edit/:id',
      controller: 'EditCtrl',
      templateUrl: '/views/edit.html'
    })

    $locationProvider.html5Mode(true);
    
}]);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.airplane = {
    manufacturer: '',
    model: '',
    engines: '',
    images: ''
  }

  $http.get('/api/airplanes').then(function success(res) {
    $scope.airplanes = res.data;
  }, function error(err) {
    console.log(err);
  });

  $scope.delete = function(id, idx) {
    $http.delete('/api/airplanes/' + id).then(function success(res) {
      $scope.airplanes.splice(idx, 1);
    }, function error(err) {
      console.log(err);
    });
  }

  $scope.add = function() {
    $http.post('/api/airplanes', $scope.airplane).then(function success(res) {
      $scope.airplanes.push(res.data);
 
   }, function error(err) {
      consolelog(err);
    });
  }
  
}]);


app.controller('EditCtrl', ['$scope', '$state', '$http', '$stateParams', function($scope, $state, $http, $stateParams) {
  $scope.airplane = {}

  $http.get('/api/airplanes/'+ $stateParams.id).then(function success(res) {
    console.log(res.data);
    $scope.airplane = res.data;
  }, function error(err) {
    console.log(err);
  });

  $scope.edit = function() {
    $http.put('/api/airplanes/'+ $stateParams.id, {manufacturer: $scope.airplane.manufacturer, model: $scope.airplane.model, engines: $scope.airplane.engines, image: $scope.airplane.image}).then(function success(res) {
      $scope.airplane = res.data;
      console.log('done');
    }, function error(err) {
      console.log(err);
    });
  }
}]);  

