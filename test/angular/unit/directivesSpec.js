'use strict'

describe('FlipList Directives', function() {
  var scope, testList, elm;

  beforeEach(function() {
    module(
      'flipListDirectives',
      'directives/fl-editable-text.html'
    );
    
    inject(function($rootScope) {
      scope = $rootScope.$new();  
    });

    //test data - TODO: move elsewhere? fixtures?
    scope.testList = {id:1, title:'List1', items:[{id:1, name:'Item 1'}, {id:2, name:'Item2'}]};
  });

  //TODO: refactor? can probably move some of this into variables or common methods
  describe('FlipListEditableText', function() {

    beforeEach(function() {
      var directiveTemplate = '<fl-editable-text ng-model="testList.title"></fl-editable-text>';
      elm = compileDirective(scope, directiveTemplate); //see helpers.js
    });

    it('should be in view mode by default', function() {
      expect(elm.find('span').eq(1).text()).toBe(scope.testList.title);
      expect(elm.find('button').eq(0).text()).toBe('Edit');

      expect(elm.isolateScope().isEditing).toBeFalsy();
      expect(elm.find('span').eq(2).hasClass('ng-hide')).toBeTruthy();
    });

    it('should reflect text changes in the model', function() {
      expect(elm.find('span').eq(1).text()).toBe(scope.testList.title);
      
      scope.testList.title = "New List1 Title";
      scope.$apply();
      expect(elm.find('span').eq(1).text()).toBe(scope.testList.title);
    });

    it('should switch to edit mode', function() {
      elm.isolateScope().toggleEdit();
      scope.$apply();
      expect(elm.find('span').eq(2).hasClass('ng-hide')).toBeFalsy();
      expect(elm.find('input').eq(0).val()).toBe(scope.testList.title);
      expect(elm.find('button').eq(1).text()).toBe('Save');
      expect(elm.find('button').eq(2).text()).toBe('Cancel');
    });

    it('should respond to enter key and save when entering text', function() {
      elm.isolateScope().toggleEdit();
      scope.testList.title = 'New List1 Title';
      var keyDownEvent = { eventName: 'keydown', keyCode: 13 }; //mock event, elm.triggerHandler doesn't seem to 
                                                                //support an event with properties? (only does dummy event)
      elm.isolateScope().onKeyDown(keyDownEvent);
      scope.$apply();
      
      expect(elm.isolateScope().isEditing).toBeFalsy();      
      expect(elm.find('input').eq(0).val()).toBe(scope.testList.title);
    });

    it('should respond to esc key and cancel edit when entering text', function() {
      elm.isolateScope().toggleEdit();
      var oldTitle = scope.testList.title;
      scope.testList.title = 'A Title I Regret';
      scope.$apply();
      expect(elm.find('input').eq(0).val()).toBe(scope.testList.title);

      var keyDownEvent = { eventName: 'keydown', keyCode: 27 }; //mock event, elm.triggerHandler doesn't seem to 
                                                                //support an event with properties? (only does dummy event)
      elm.isolateScope().onKeyDown(keyDownEvent);
      scope.$apply();

      expect(elm.isolateScope().isEditing).toBeFalsy();      
      expect(scope.testList.title).toBe(oldTitle);
    });

  });

//I think I just need to get jQuery loaded to get this working...
//TODO: Not entirely sure what to test here - can I manually call sortable callbacks?
//There is some test coverage for this directive in e2e tests at least
  describe('FlipListSortable', function() {

    beforeEach(function() {
      //var directiveTemplate = '<ul fl-sortable on-sort="onSort(sortOrderUpdates)"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>';
      //elm = compileDirective(scope, directiveTemplate); //see helpers.js
    });

    it('should sort items', function() {
      
    });

  });

});