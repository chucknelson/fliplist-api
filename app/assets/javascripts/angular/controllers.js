'use strict'

var flipListControllers = angular.module('flipListControllers', []);

flipListControllers.controller('FlipListHomeController', ['$scope', 'User', function($scope, User) {
  $scope.users = User.query();


}]);

flipListControllers.controller('FlipListListsController', ['$scope', '$routeParams', 'List', function($scope, $routeParams, List) {
  $scope.lists = List.query({userId: $routeParams.userId});

  //get list index, which is useful for interacting with the lists model/collection
  $scope.getListIndex = function(listId) {
    for(var i = 0; i < $scope.lists.length; i++) {
      if($scope.lists[i].id == listId) {
        return i;
      }
    }
  };

  //get an item, useful for when you want to work with an item instance
  $scope.getList = function(listId) {
    var listIndex = $scope.getListIndex(listId);
    return $scope.lists[listIndex];
  };

  $scope.createList = function(listName) {
    var newList = new List({title: listName});
    $scope.lists.push(newList);
    newList.$save();
    $scope.newListTitle = '';
  }

  $scope.deleteList = function(listId) {
    var listIndex = $scope.getListIndex(listId);
    $scope.lists[listIndex].$remove();
    $scope.lists.splice(listIndex,1);
  };

}]);

flipListControllers.controller('FlipListListDetailController', ['$scope', '$routeParams', 'List', function($scope, $routeParams, List) {
  $scope.list = List.get({userId: $routeParams.userId, listId: $routeParams.listId});

  $scope.saveList = function() {
    $scope.list.$update();
  };

  //the detail controller, which has the current list instance, is responsible for sending sort data to the list
  $scope.sortList = function(sortOrderUpdates) {
    //not using instance of list because we want the order updates to be in the request payload, not as a querystring on the URL
    //this seems like a weird limitation in angular, but this is how you send request payload data in a PUT/PATCH
    List.sort({userId: $routeParams.userId, listId: $routeParams.listId}, {sort_order_updates: sortOrderUpdates});
  };

}]);

flipListControllers.controller('FlipListItemsController', ['$scope', '$routeParams', 'orderByFilter', 'Item', function($scope, $routeParams, orderByFilter, Item) {
  $scope.items = Item.query({userId: $routeParams.userId, listId: $routeParams.listId});
  $scope.item = {};

  //get item index, which is useful for interacting with the items model/collection
  $scope.getItemIndex = function(itemId) {
    for(var i = 0; i < $scope.items.length; i++) {
      if($scope.items[i].id == itemId) {
        return i;
      }
    }
  };

  //get an item, useful for when you want to work with an item instance
  $scope.getItem = function(itemId) {
    var itemIndex = $scope.getItemIndex(itemId);
    return $scope.items[itemIndex];
  };

  //the items controller, which has the items for the current list, is responsible for ordering the items model
  $scope.orderItems = function(sortOrderUpdates) {
    //if no sort order updates, figure out what has changed
    //should flSortable be responsible for detecting when things change like when an item is deleted in the middle of the list/array?
    //maybe the controller should not be responsible for creating these updates?
    //is this a good candidate for a service?
    if(!sortOrderUpdates) {
      var sortOrderUpdates = [];
      var currentItem;
      
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

    if(sortOrderUpdates.length > 0) {
      $scope.sortList(sortOrderUpdates);
      $scope.items = orderByFilter($scope.items, 'sort_order');
    }
  };

  $scope.orderItem = function(itemId, sortOrder) {
    var itemToOrder = $scope.getItem(itemId);
    itemToOrder.sort_order = sortOrder;
  };

  $scope.createItem = function(itemName) {
    var newItem = new Item({name: itemName, sort_order: $scope.items.length, list_id: $routeParams.listId});
    //a learning moment: we can't push item into array before an item ID is received from the server
    //via $save() because we're tracking items in ngRepeat by the item ID
    //
    //had to look into the angular source to figure out what ngRepeat was doing when the 
    //value it "tracked by" was changing after the fact
    //a change like this was NOT detected by angular because it was just one property
    //in an object in a collection
    //
    //will need a unique static value from the client to remove the server dependence/latency
    //hopefully will figure something else out later
    //a client-generated ID just for ngRepeat purposes is the option I can immediately think of
    newItem.$save({userId: $routeParams.userId}).then(function() {
      $scope.items.push(newItem); //have the item ID from the server at this point
    });

    $scope.newItemName = ''
  };

  $scope.saveItem = function(itemId) {
    var itemIndex = $scope.getItemIndex(itemId);
    $scope.items[itemIndex].$update({userId: $routeParams.userId});
  };

  $scope.deleteItem = function(itemId) {
    var itemIndex = $scope.getItemIndex(itemId);
    $scope.items[itemIndex].$remove({userId: $routeParams.userId}); //api
    $scope.items.splice(itemIndex, 1); //client model
    
    if($scope.items.length > 0) {
      $scope.orderItems(null); //update remaining items order
    }
  };

}]);