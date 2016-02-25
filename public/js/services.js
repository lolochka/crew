'use strict';

/* Services */

var crewServices = angular.module('crewServices', ['ngResource']);

crewServices.factory('Employees', ['$http', function($http){
    var urlBase = '/employees';
    var _employees = {};
    
    _employees.get = function() {
        return $http.get(urlBase);
    }
    
    _employees.create = function(empl) {
        return $http.post(urlBase, empl);
    }
    
    _employees.read = function(id) {
       return $http.get(urlBase + '/' + id); 
    };
    
    _employees.delete = function(id) {
        return $http.delete(urlBase + '/' + id);
    }
    
    _employees.update = function(id,empl) {
        return $http.put(urlBase + '/' + id,empl);
    }
    
    return _employees;

}]);

crewServices.factory('Cache', ['$resource', function($resource) {
	var cache_service = {};


    cache_service.itemExist = function(key){
      return (localStorage[key] !== undefined);
    };

    cache_service.removeItem = function(key){
      localStorage.removeItem(key);
    };

    cache_service.clear = function(){
      localStorage.clear();
    };

    return cache_service;
}]);

crewServices.factory('Employee', ['$location', 'Cache', '$window', 'Employees', function($location, Cache, $window, Employees) {
    var employee_service = {};
      
    employee_service.delete = function (key, arr) {
    if (arr !== undefined) {
      for (var i = 0; i < arr.length; i++ ) {
        if ( arr[i]._id == key) {
          if (i > 0) {
            var k = i - 1;
            $location.path("/employees/" + arr[k]._id).replace();
          } else {
            $location.path("/employees/").replace();
          }
          arr.splice(i, 1);
          return arr;
        }
      }
    }
  };

  employee_service.add = function (obj, arr) {
    if (obj._id == undefined) {
      employee_service.addNew(obj, arr);
    } else {
      employee_service.edit(obj, arr);
    }
  }
  
  employee_service.addNew = function (obj, arr) {
    var date = new Date();
    obj._id = date.getTime();
    obj.comments = [];
    arr.push(obj);
    Cache.cacheItem(obj._id, obj);
  };

  employee_service.addTxt = function (obj, txt) {
    if (txt.text) {
      var date = new Date();
      txt.date = date;
      txt.username = 'User';
      txt._id = date.getTime();
      var newComment = txt;
      obj.comments.push(newComment);
      Employees.update(obj._id, obj);
      return txt;
    }
  }

  employee_service.removeTxt = function (obj, txt) {
    for (var i = 0, ii = obj.comments.length; i < ii; i++) {
      if (txt === obj.comments[i]) {
        obj.comments.splice(i, 1);
      };
    }
    Employees.update(obj._id, obj);
  }
  
  return employee_service;
}]);