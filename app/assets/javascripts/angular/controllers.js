'use strict'

var flipListControllers = angular.module('flipListControllers', []);

flipListControllers.controller('FlipListController', ['$scope', 'List', function($scope, List) {
  $scope.lists = List.query();

  $scope.createList = function(listName) {
    var newList = new List({title: listName});
    $scope.lists.push(newList);
    newList.$save();
    $scope.newListTitle = '';
  }

  $scope.deleteList = function(listIndex) {
    $scope.list = $scope.lists[listIndex];
    $scope.lists.splice(listIndex,1);
    $scope.list.$remove();
  };

}]);

flipListControllers.controller('FlipListDetailController', ['$scope', '$routeParams', 'List', function($scope, $routeParams, List) {
  $scope.list = List.get({listId: $routeParams.listId});

  $scope.saveList = function() {
    $scope.list.$update();
  };

  //the detail controller, which has the current list instance, is responsible for sending sort data to the list
  $scope.sortList = function(sortOrderUpdates) {
    //not using instance of list because we want the order updates to be in the request payload, not as a querystring on the URL
    //this seems like a weird limitation in angular, but this is how you send request payload data in a PUT/PATCH
    List.sort({listId: $scope.list.id}, {sort_order_updates: sortOrderUpdates});
  };

}]);

flipListControllers.controller('FlipListItemsController', ['$scope', '$routeParams', 'filterFilter', 'orderByFilter', 'Item', function($scope, $routeParams, filterFilter, orderByFilter, Item) {
  $scope.items = Item.query({listId: $routeParams.listId});
  $scope.item = {};

  //the items controller, which has the items for the current list, is responsible for ordering the items model
  $scope.orderItems = function(sortOrderUpdates) {
    sortOrderUpdates.forEach(function(update) {
      $scope.orderItem(update.id, update.newSortOrder);
    });

    $scope.sortList(sortOrderUpdates);
    $scope.items = orderByFilter($scope.items, 'sort_order');
  };

  $scope.orderItem = function(itemId, sortOrder) {
    var itemToOrder = filterFilter($scope.items, {id: itemId}).pop(); //filters return an array, but we're only getting one item
    itemToOrder.sort_order = sortOrder;
  };

  $scope.createItem = function(itemName) {
    var newItem = new Item({name: itemName, sort_order: $scope.items.length, list_id: $routeParams.listId});
    $scope.items.push(newItem);
    newItem.$save();
    $scope.newItemName = ''
  };

  $scope.saveItem = function(itemIndex) {
    $scope.item = $scope.items[itemIndex];
    $scope.item.$update();
  };

  $scope.deleteItem = function(itemIndex) {
    $scope.item = $scope.items[itemIndex];
    $scope.items.splice(itemIndex,1);
    $scope.item.$remove();
  };

}]);