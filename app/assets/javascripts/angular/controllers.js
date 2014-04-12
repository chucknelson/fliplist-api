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

  $scope.getItem = function(itemId) {
    //using fancy (and expensive?) angular filters, maybe I should just iterate the collection
    return filterFilter($scope.items, {id: itemId}).pop(); //filters return an array, but we're only getting one item
  };

  //the items controller, which has the items for the current list, is responsible for ordering the items model
  $scope.orderItems = function(sortOrderUpdates) {
    if(!sortOrderUpdates) {
      var sortOrderUpdates = [];
      var currentItem;
      //if no sort order updates, figure out what has changed
      //should flSortable be responsible for detecting when things change like when an item is deleted in the middle of the list/array?
      //the controller should not be responsible for creating these updates
      for(var i = 0; i < $scope.items.length; i++) {
        if(i != $scope.items[i].sort_order) {
          currentItem = $scope.items[i];
          $scope.orderItem(currentItem.id, i);
          sortOrderUpdates.push({id: currentItem.id, newSortOrder: i});  
        }
      }
    }
    else {
      sortOrderUpdates.forEach(function(update) {
        $scope.orderItem(update.id, update.newSortOrder);
      });
    }

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

  $scope.deleteItem = function(itemId) {
    for(var i = 0; i < $scope.items.length; i++) {
      if($scope.items[i].id == itemId) {
        $scope.items[i].$remove(); //api
        $scope.items.splice(i, 1); //client model
      }
    }
    
    if($scope.items.length > 0) {
      $scope.orderItems(null); //update remaining items order
    }
  };

}]);