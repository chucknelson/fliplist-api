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

  describe('FlipListEditableText', function() {

    beforeEach(function() {
      elm = compileDirective(scope); //see helpers.js
    });

    it('should display list title', function() {
      expect(elm.find('span').contents().eq(1).text()).
        toBe(scope.testList.title);
    });

  });
});