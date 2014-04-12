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

//somewhat generic sorting directive which wraps jQuery UI sortable
//when applied to any parent container the immediate child elements become sortable
//child elements must contain a child hidden input named "id" that is a unique identifier for that element/data
//when the jQuery UI sortable update() callback is triggered the directive provides an itemUpdates collection that
//contains JS objects defined as {id, newSortOrder} for all elements that have a changed sort order
//it also calls the method defined in the on-sort property for the directive
//intended usage is to pass sortOrderUpdates to a method in your controller that updates the model represented by the sortable list.
flipListDirectives.directive('flSortable', function() {
  return {
    //isolate scope
    scope: {
      onSort: '&'
    },
    compile: function(tElement, tAttrs) {
      //could use compile if we needed to set up some common functionality for all instances. Since this is just a one-instance directive on my page right now, this has no real benefit...
      return function link(scope, element, attrs) {
        var oldSortOrder;

        element.sortable({
          start: function(event, ui) {
            oldSortOrder = ui.item.index();
          },
          update: function(event, ui) {
            var itemId, sortOrderUpdates, newSortOrder, orderDiff, currentIndex, currentId;

            itemId = ui.item.children('input[name="id"]').val();
            newSortOrder = ui.item.index();

            //determine items that require a sort order update
            sortOrderUpdates = [];
            orderDiff = newSortOrder - oldSortOrder;
            currentIndex = newSortOrder;
            for(var i = 0; i <= Math.abs(orderDiff); i++) {
              currentId = ui.item.parent().children().eq(currentIndex).find('input[name="id"]').val();                         
              sortOrderUpdates.push({id: currentId, newSortOrder: currentIndex});                         
              orderDiff > 0 ? currentIndex-- : currentIndex++;
            };

            //on-update method called in jquery world, so we need to wrap in $apply() to inform angular;
            scope.$apply(function() {
              scope.onSort({sortOrderUpdates: sortOrderUpdates});
            });
          }
        });
      }
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
