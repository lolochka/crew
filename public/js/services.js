'use strict';

/* Services */

var crewServices = angular.module('crewServices', ['ngResource']);

/* CRUD service */
crewServices.factory('Employees', ['$resource', function($resource){
    return $resource('/employees/:id', null, {
        'update': { method:'PUT' }
    }); 
}]);


crewServices.factory('manageEmployee', ['$location', '$window', 'Employees', function($location, $window, Employees) {
    var employee_service = {};
    
    /* Remove Employee from UI */ 
    employee_service.delete = function (key, arr) {
        for (var i = 0; i < arr.length; i++ ) {
            if ( arr[i]._id === key) {
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
    };
  
    return employee_service; 
}]);

/* Comments service */
crewServices.factory('Comments',['Employees',function(Employees){
    var comments_service ={};
    
    /* CREATE comment */
    comments_service.addTxt = function (obj, txt) {
        if (txt.text) {
            var date = new Date();
            txt.date = date;
            txt.username = 'User';
            txt._id = date.getTime();
            var newComment = txt;
            obj.comments.push(newComment);
            Employees.update({id: obj._id}, obj);
            return txt;
        }
    }

    /* DELETE comment */ 
    comments_service.removeTxt = function (obj, txt) {
        for (var i = 0, ii = obj.comments.length; i < ii; i++) {
            if (txt === obj.comments[i]) {
                obj.comments.splice(i, 1);
            };
        }
        Employees.update({id: obj._id}, obj);
    }
  
    return comments_service;
}])