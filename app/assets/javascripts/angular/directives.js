'use strict'

var flipListDirectives = angular.module('flipListDirectives', []);

flipListDirectives.directive('flModelDebug', function() {
  return {
    restrict: 'E',
    require: '?ngModel',
    scope: {},
    templateUrl: 'directives/fl-model-debug.html',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$render = function() {
        scope.modelName = attrs.ngModel;
        scope.modelValue = ngModel.$viewValue;  
      };
    }
  };
});

//TODO: review - this seems like a lot of code for very basic functionality
flipListDirectives.directive('flEditableText', function() {
  return {
    restrict: 'E',
    require: '?ngModel',
    templateUrl: 'directives/fl-editable-text.html',
    scope: { 
      onSave: '&'
    },
    link: function(scope, element, attrs, ngModel) {
      scope.isEditing = false;

      ngModel.$render = function() {
        scope.text = ngModel.$viewValue;
      }

      scope.$watch('text', function() {
        ngModel.$setViewValue(scope.text);
      });

      scope.$watch('isEditing', function() {
        if(scope.isEditing) { 
          //the following breaks unit tests - why is focus() not available?
          //element.find('input').eq(0).focus().select();
        }
      });

      scope.toggleEdit = function() { 
        scope.originalText = scope.text;
        scope.isEditing = !scope.isEditing;
      }

      scope.saveEdit = function () {
        if(scope.originalText && scope.text != scope.originalText) {
          scope.onSave();
        }
        scope.toggleEdit();
      }

      scope.cancelEdit = function() {
        scope.text = scope.originalText;
        scope.toggleEdit();
      }

      scope.onKeyDown = function(event) {
        if (event.keyCode == 13) {
          scope.saveEdit();
        }
        else if (event.keyCode == 27) {
          scope.cancelEdit();
        }
      }
    }
  };
});
