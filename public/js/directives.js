'use strict';

/* Directives */
crewApp.directive('select', function ($interpolate) {
  return {
    restrict: 'E',
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var defaultOptionTemplate;
      scope.defaultOptionText = attrs.defaultOption || 'Select...';
      defaultOptionTemplate = '<option value="" disabled selected style="display: none;">{{defaultOptionText}}</option>';
      elem.prepend($interpolate(defaultOptionTemplate)(scope));
    }
  };
});

crewApp.directive('resize', function ($window) {
  return function (scope, element, attr) {

    var w = angular.element($window);
    scope.$watch(function () {
      return {
        'h': window.innerHeight,
        'w': window.innerWidth
      };
    }, function (newValue, oldValue) {

      scope.resizeWithOffset = function (offsetH) {
        scope.$eval(attr.notifier);
        return {
          'maxHeight': (newValue.h - offsetH) + 'px'
        };
      };
    }, true);

    w.bind('resize', function () {
      scope.$apply();
    });
  };
});
