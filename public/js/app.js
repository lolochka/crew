'use strict';

/* App Module */
var crewApp = angular.module('crewApp', ['ngRoute', 'crewControllers', 'crewServices', 'route-segment', 'view-segment', 'ngAnimate']);

/* Nested Routing */
crewApp.config(['$routeSegmentProvider', '$routeProvider',
  function ($routeSegmentProvider, $routeProvider) {
    
    $routeSegmentProvider
      .when('/employees',               'employees')
      .when('/employees/:employeeId',   'employees.employeeDetail')
      .when('/about',                   'about')
      .when('/faq',                     'faq')
      .when('/contact',                 'contact')
      .when('/error',                   'error')

      .segment('employees', {
        templateUrl: 'partials/employees.html',
        controller: 'EmployeeListCtrl'
      })

      .within()
        .segment('home', {
          default: true,
          templateUrl: 'partials/employees/home.html',
          controller: 'EmployeeListCtrl'
        })

        .segment('employeeDetail', {
          templateUrl: 'partials/employees/employee-detail.html',
          dependencies: ['employeeId'],
          controller: 'EmployeeDataCtrl'
        })

        .up()
      
      .segment('about', {
        templateUrl: 'partials/about.html'
      })

      .segment('faq', {
        templateUrl: 'partials/faq.html',
        controller: 'FaqCtrl'
      })

      .segment('contact', {
        templateUrl: 'partials/contact.html'
      })
    
      .segment('error', {
        templateUrl: 'partials/error.html'
      });

    $routeProvider.otherwise({redirectTo: '/employees'});

  }
]);