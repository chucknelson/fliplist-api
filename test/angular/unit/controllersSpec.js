describe('FlipList Controllers', function() {
  var scope, controller, $httpBackend;

  beforeEach(function() {
    module('flipListApp');
    inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    });
  });

  describe('FlipListController', function() {

    beforeEach(inject(function($rootScope, $controller) {
      $httpBackend.expectGET('api/lists').
        respond([
          {id:1, title:'List1', items:[{name:'Item 1'}, {name:'Item2'}]},
          {id:2, title:'Empty List'}
          ]);

      scope = $rootScope.$new();
      controller = $controller('FlipListController', {$scope: scope});
    }));

    it('should create "lists" model with 2 different lists fetched from api', function() {
      expect(scope.lists).toBeUndefined;
      $httpBackend.flush();
      expect(scope.lists.length).toBe(2);
      expect(scope.lists[0].items.length).toBe(2);
      expect(scope.lists[1].items).toBeUndefined;
    });

  });
});