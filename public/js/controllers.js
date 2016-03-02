'use strict';

/* Controllers */

var crewControllers = angular.module('crewControllers', []);

crewControllers.controller('EmployeeListCtrl', [
    '$scope',
    '$location',
    '$window',
    'manageEmployee',
    '$http',
    'Employees',
    '$rootScope',
    function (
        $scope,
        $location, 
        $window, 
        manageEmployee, 
        $http, 
        Employees, 
        $rootScope) {
    
  $scope.employees = Employees.query();
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
    Employees.remove({id: param}, function() {
      $scope.employees = manageEmployee.delete(param, $scope.employees);
    });
  };
   
  $scope.addEmployee = function() {
    $scope.newEmployee.skills = $scope.newEmployee.skills.split(", ");
    
    var employee = new Employees($scope.newEmployee);
    console.log(employee);
    employee.$save(function(){
      $scope.employees.push(employee);
      $rootScope.showForm = false;
      $scope.newEmployee = {};
      $location.path("/employees/"+employee._id).replace();
    })
  };
  
  $rootScope.form = function() {
      $rootScope.showForm = !$rootScope.showForm;
      $rootScope.edit = false;
      $scope.newEmployee = {};
  }
  
  $scope.saveEmployee = function() {
      $scope.newEmployee.skills = $scope.newEmployee.skills.split(", ");
      var employee = $scope.newEmployee;
      Employees.update({id: employee._id},employee);
      $rootScope.showForm = false;
      $rootScope.edit = false;
      $location.path("/employees/"+$scope.newEmployee._id).replace();
      $window.location.reload();
   }

}])

.controller('EmployeeDataCtrl', [
      '$scope', 
      '$routeParams',
      '$routeSegment', 
      '$location', 
      'manageEmployee', 
      'Employees', 
      '$rootScope',  
      function(
          $scope, 
          $routeParams,
          $routeSegment, 
          $location, 
          manageEmployee, 
          Employees, 
          $rootScope) {

    $scope.routeParams = $routeParams.employeeId;
    
    $scope.thisEmployee = Employees.get({id:$routeParams.employeeId},function(res){   },function(res){
      if (res.status === 404) {
        $location.path("/error").replace();
      }
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
      manageEmployee.addTxt(obj, txt);
      $scope.newComment = {};
    };

    $scope.removeComment = manageEmployee.removeTxt;

    $scope.showDetails = "show";

    $scope.hideDetails = function() {
      $location.path("/employees/").replace();
    }
    
  }]);


crewControllers.controller('FaqCtrl', ['$scope', '$http', function($scope, $http) {

  $http.get('options/faqs.json').success(function(data) {
    $scope.faqs = data;
  }); 
}]);