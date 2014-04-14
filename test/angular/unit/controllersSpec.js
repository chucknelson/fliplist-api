'use strict'

describe('FlipList Controllers', function() {
  var scope, controller, routeParams, $httpBackend, 
    testLists, testList;

  beforeEach(function() {
    module('flipListApp');
    inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    });

    //test data - TODO: move elsewhere? fixtures?
    testLists = [
      {id:1, title:'List1', items:[{id:1, name:'Item 1', sort_order: 0, list_id:1}, {id:2, name:'Item2', sort_order: 1, list_id:1}]},
      {id:2, title:'Empty List'}
      ];
    testList = testLists[0];

  });

  describe('FlipListController', function() {

    beforeEach(inject(function($rootScope, $controller) {
      $httpBackend.expectGET('api/lists').
        respond(testLists);

      scope = $rootScope.$new();
      controller = $controller('FlipListController', {$scope: scope});

      $httpBackend.flush(); //lists populated in controller, ready to test
    }));

    it('should create "lists" model with 2 different lists fetched from api', function() {
      expect(scope.lists.length).toBe(testLists.length);
      expect(scope.lists[0].items.length).toBe(testLists[0].items.length);
    });

    it('should create a list', function() {
      var newList = {title: 'New List'};
      $httpBackend.expectPOST('api/lists', newList).respond(200);

      scope.createList(newList.title);
      $httpBackend.flush();
      expect(scope.lists[2].title).toBe(newList.title);
      expect(scope.lists.length).toBe(testLists.length + 1);
    });

    it('should delete a list', function() {
      var testList = scope.lists[0];
      $httpBackend.expectDELETE('api/lists/' + testList.id).respond(200);
      scope.deleteList(testList.id);
      $httpBackend.flush();
      expect(scope.lists.length).toBe(testLists.length - 1);
      expect(scope.lists[0]).not.toBe(testList);
    });

  });

  describe('FlipListDetailController', function() {

    beforeEach(inject(function($rootScope, $controller) {
      $httpBackend.expectGET('api/lists/' + testList.id).
        respond(testList);

      routeParams = {}; //passed in to controller so we can modify in tests
      routeParams.listId = testList.id;
      scope = $rootScope.$new();
      controller = $controller('FlipListDetailController', {$scope: scope, $routeParams: routeParams});
      
    }));

    it('should create "list" model fetched from api', function() {
      $httpBackend.flush();
      expect(scope.list.title).toBe(testList.title);
      expect(scope.list.items.length).toBe(testList.items.length);
    });

    it('should update a list', function() {
      $httpBackend.flush();
      expect(scope.list.title).toBe(testList.title);

      testList.title = 'Modified Title';
      $httpBackend.expectPUT('api/lists/' + testList.id, testList).respond(200);
      scope.list.title = testList.title;
      scope.saveList(scope.list);
      $httpBackend.flush();
      expect(scope.list.title).toBe(testList.title);
    });

  });

  describe('FlipListItemsController', function() {
    var detailController;

    beforeEach(inject(function($rootScope, $controller) {
      $httpBackend.expectGET('api/lists/' + testList.id).
        respond(testList);
      $httpBackend.expectGET('api/lists/' + testList.id + '/items').
        respond(testList.items);

      routeParams = {}; //passed in to controller so we can modify in tests
      routeParams.listId = testList.id;
      scope = $rootScope.$new();

      //the items controller will be inside of a detail controller, so we'll provide an instance of one in cases where the inherited scope is used (e.g., orderItem())
      detailController = $controller('FlipListDetailController', {$scope: scope, $routeParams: routeParams});
      controller = $controller('FlipListItemsController', {$scope: scope, $routeParams: routeParams});

      $httpBackend.flush(); //items populated in controller, ready to test
    }));

    it('should create "items" model for a specific list fetched from api', function() {
      expect(scope.items.length).toBe(testList.items.length);
      expect(scope.items[0].list_id).toBe(testList.id);
    });

    it('should create an item', function() {
      var newItem = {name: 'Item 3', sort_order: testList.items.length, list_id: testList.id};
      $httpBackend.expectPOST('api/lists/' + testList.id + '/items', newItem).respond(200);

      scope.createItem(newItem.name);
      $httpBackend.flush();
      expect(scope.items.length).toBe(testList.items.length + 1);
      expect(scope.items[2].name).toBe(newItem.name);
      expect(scope.items[2].sort_order).toBe(scope.items.length - 1) //0 indexed;
    });

    it('should update an item', function() {
      var testItem = angular.copy(scope.items[0]);
      testItem.name = 'Modified Name';
      expect(testItem.name).not.toBe(testList.items[0].name);

      $httpBackend.expectPUT('api/lists/' + testList.id + '/items/' + testItem.id, testItem).respond(200);
      scope.items[0].name = testItem.name;
      scope.saveItem(testItem.id);
      $httpBackend.flush();
      expect(scope.items[0].name).toBe(testItem.name);
    });

    it('should delete an item', function() {
      var testItem = scope.items[0];
      $httpBackend.expectDELETE('api/lists/' + testList.id + '/items/' + testItem.id).respond(200);
      $httpBackend.expectPATCH('api/lists/' + testList.id + '/sort').respond(200);
      scope.deleteItem(testItem.id);
      $httpBackend.flush();
      expect(scope.items.length).toBe(testList.items.length - 1);
      expect(scope.items[0]).not.toBe(testItem);
    });

    it('should order items', function() {
      var firstItem = scope.items[0];
      var secondItem = scope.items[1];
      expect(firstItem.sort_order).toBe(0);
      expect(secondItem.sort_order).toBe(1);

      //swap order
      var sortOrderUpdates = [{id: firstItem.id, newSortOrder: 1}, {id: secondItem.id, newSortOrder: 0}];
      $httpBackend.expectPATCH('api/lists/' + testList.id + '/sort').respond(200);
      scope.orderItems(sortOrderUpdates);
      $httpBackend.flush();

      expect(firstItem.sort_order).toBe(1);
      expect(secondItem.sort_order).toBe(0);
    });

    it('should not order items if no sort orders have changed', function() {
      var lastItem = scope.items[1];

      //delete last item
      $httpBackend.expectDELETE('api/lists/' + testList.id + '/items/' + lastItem.id).respond(200);
      scope.deleteItem(lastItem.id);
      $httpBackend.flush(); //a PATCH request for sort should NOT come through

      expect(scope.items[1]).toBeUndefined(); //item should be deleted
    });

  });

});