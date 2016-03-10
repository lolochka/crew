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

  /* GET options for selectboxes */
  $http.get('options/levels.json').success(function(data) {
    $scope.levels = data;
  });
  $http.get('options/departments.json').success(function(data) {
    $scope.departments = data;
  });
  $http.get('options/months.json').success(function(data) {
    $scope.months = data;
  });
  
  /* CREATE new employee */
  $scope.addEmployee = function() {   
    var employee = new Employees($scope.newEmployee);
    console.log(employee);
    employee.$save(function(){
      $scope.employees.push(employee);
      $rootScope.showForm = false;
      $scope.newEmployee = {};
      $location.path("/employees/"+employee._id).replace();
    })
  };

  /* DELETE employee */
  $scope.deleteEmployee = function (param) {
    console.log(param);
    Employees.remove({id: param}, function() {
      $scope.employees = manageEmployee.delete(param, $scope.employees);
    });
  };
  
  /* UPDATE employee */
  $scope.saveEmployee = function() {
      var employee = $scope.newEmployee;
      Employees.update({id: employee._id},employee);
      $rootScope.showForm = false;
      $rootScope.edit = false;
      $location.path("/employees/"+$scope.newEmployee._id).replace();
      $window.location.reload();
   }
   
  /* CLOSE form */
  $rootScope.form = function() {
      $rootScope.showForm = !$rootScope.showForm;
      $rootScope.edit = false;
      $scope.newEmployee = {};
  }

}])

.controller('EmployeeDataCtrl', [
      '$scope', 
      '$routeParams',
      '$routeSegment', 
      '$location', 
      'Comments', 
      'Employees', 
      '$rootScope',  
      function(
          $scope, 
          $routeParams,
          $routeSegment, 
          $location, 
          Comments, 
          Employees, 
          $rootScope) {

    $scope.routeParams = $routeParams.employeeId;
    
    /* GET employee */
    $scope.thisEmployee = Employees.get({id:$routeParams.employeeId},function(){},function(res){
      if (res.status === 404) {
        $location.path("/error").replace();
      }
    });
    
    /* On EDIT mode for form */
    $scope.editEmployee = function (obj) {
        $rootScope.edit = true;
        $rootScope.showForm = true;
        angular.copy(obj, $scope.newEmployee);
    };

    $scope.newComment = {};
    
    /* CREATE comment */
    $scope.addComment = function (obj, txt) {
      Comments.addTxt(obj, txt);
      $scope.newComment = {};
    };

    /* DELETE comment */
    $scope.removeComment = Comments.removeTxt;

    /* Details in responsive mode */
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