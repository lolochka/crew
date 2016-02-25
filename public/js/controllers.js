'use strict';

/* Controllers */

var crewControllers = angular.module('crewControllers', []);

crewControllers.controller('EmployeeListCtrl', [
    '$scope',
    'Cache',
    '$location',
    '$window',
    'Employee',
    '$http',
    'Employees',
    '$rootScope',
    function (
        $scope,
        Cache,
        $location, 
        $window, 
        Employee, 
        $http, 
        Employees, 
        $rootScope) {
    
  Employees.get().success(function(data) {
      $scope.employees = data;
  });
  $scope.thisEmployee = {};
  $scope.newEmployee = {};

  $http.get('options/levels.json').success(function(data) {
    $scope.levels = data;
  });
  $http.get('options/departments.json').success(function(data) {
    $scope.departments = data;
  });
  $http.get('options/months.json').success(function(data) {
    $scope.months = data;
  });

  $scope.deleteEmployee = function (param) {
    console.log(param);
    Employees.delete(param).success(function(data){
        console.log(data);
    });
    $scope.employees = Employee.delete(param, $scope.employees);
  };
   
  $scope.addEmployee = function() {
    $scope.newEmployee.skills = $scope.newEmployee.skills.split(", ");
    Employees.create($scope.newEmployee).success(function(data){
        $scope.employees.push(data);
        $location.path("/employees/"+data._id).replace();
    }).error(function(data){
        console.log(data);
    });
    $scope.newEmployee = {};
    $rootScope.showForm = false;
    return false;
  };
  
  $rootScope.form = function() {
      $rootScope.showForm = !$rootScope.showForm;
      $rootScope.edit = false;
      $scope.newEmployee = {};
  }
  
  $scope.saveEmployee = function() {
      $scope.newEmployee.skills = $scope.newEmployee.skills.split(", ");
      Employees.update($scope.newEmployee._id,$scope.newEmployee).success(function(data){
          $rootScope.showForm = false;
          $rootScope.edit = false;
          $location.path("/employees/"+$scope.newEmployee._id).replace();
          $window.location.reload();
      })
  }

}])

.controller('EmployeeDataCtrl', [
      '$scope', 
      '$routeParams', 
      'Cache', 
      '$routeSegment', 
      '$location', 
      'Employee', 
      'Employees', 
      '$rootScope',  
      function(
          $scope, 
          $routeParams, 
          Cache, 
          $routeSegment, 
          $location, 
          Employee, 
          Employees, 
          $rootScope) {

    $scope.routeParams = $routeParams.employeeId;

    Employees.read($routeParams.employeeId).success(function(data){
        $scope.thisEmployee = data;
    }).error(function(data){
        $location.path("/employees").replace();
    });
    
    // $scope.experience = Employee.getExperience;
    $scope.editEmployee = function (obj) {
        $rootScope.edit = true;
        $rootScope.showForm = true;
        angular.copy(obj, $scope.newEmployee);
        $scope.newEmployee.skills = $scope.newEmployee.skills.join(', ');
    };

    $scope.newComment = {};
    $scope.addComment = function (obj, txt) {
      Employee.addTxt(obj, txt);
      $scope.newComment = {};
    };

    $scope.removeComment = Employee.removeTxt;

    $scope.showDetails = "show";

    $scope.hideDetails = function() {
      $location.path("/employees/").replace();
    }
    
    console.log(this);
  }]);


crewControllers.controller('FaqCtrl', ['$scope', '$http', function($scope, $http) {

  $http.get('options/faqs.json').success(function(data) {
    $scope.faqs = data;
  }); 
}]);