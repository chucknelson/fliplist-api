'use strict'

//TODO:
//(1) A few complex scenarios with lots of single-list editing
//(2) Look into promises more and see if I can have the page object methods use strings/names instead of index values

describe('FlipList', function() {
  var ListsPage = require('./page-objects/lists-page.js');
  var listsPage, listDetailPage;

  beforeEach(function() {
    listsPage = new ListsPage();
    listsPage.get('/');
  });

  describe('Navigating to Lists', function() {

    beforeEach(function () {
    });

    it('should display an empty list and then go back to lists page', function() {
      var targetList = 'Empty List';
      listDetailPage = listsPage.navigateToList(targetList);
      expect(listDetailPage.listTitle.getText()).toBe(targetList);
      expect(listDetailPage.listItems.count()).toBe(0);

      listsPage = listDetailPage.navigateToListsPage();
      expect(listsPage.lists.count()).toBe(3);
    });

    it('should display a list with items', function() {
      var targetList = 'Yummy Treats';
      listDetailPage = listsPage.navigateToList(targetList);
      expect(listDetailPage.listTitle.getText()).not.toBe('Empty List');
      expect(listDetailPage.listItems.count()).toBe(3);
    });
    
  });

  describe('Modifying Lists', function() {

    beforeEach(function () {
    });

    it('should modify a list title', function() {
      var targetList = 'Empty List';
      listDetailPage = listsPage.navigateToList(targetList);
      var newTitle = 'A Really Empty List';
      listDetailPage.editListTitle(newTitle);
      expect(listDetailPage.listTitle.getText()).toBe(newTitle);
    });

    it('should modify an item', function() {
      var targetList = 'Yummy Treats';
      listDetailPage = listsPage.navigateToList(targetList);
      var newItemName = 'Chocolate Ice Cream';
      listDetailPage.editItemNameAtIndex(1, newItemName);
      expect(listDetailPage.getItemNameAtIndex(1)).toBe(newItemName);
    });

    it('should sort items', function() {
      var targetList = 'Yummy Treats';
      listDetailPage = listsPage.navigateToList(targetList);

      var oldFirstItemName = listDetailPage.getItemNameAtIndex(0);
      var oldSecondItemName = listDetailPage.getItemNameAtIndex(1);
      var oldThirdItemName = listDetailPage.getItemNameAtIndex(2);

      listDetailPage.moveItemToIndex(0, 1);
      var newFirstItemName = listDetailPage.getItemNameAtIndex(0);
      expect(newFirstItemName).not.toBe(oldFirstItemName);
      expect(newFirstItemName).toBe(oldSecondItemName);

      listDetailPage.moveItemToIndex(1, 0);
      listDetailPage.moveItemToIndex(2, 0);
      newFirstItemName = listDetailPage.getItemNameAtIndex(0);
      expect(newFirstItemName).not.toBe(oldFirstItemName);
      expect(newFirstItemName).toBe(oldThirdItemName);
    });

    //any additive or destructive tests are last, order matters because data is changed
    //is there a better way to do this / make things more independent? 
    //considering this is e2e, I don't think being truly independent is possible...?
    it('should create a new list', function() {
      var newListTitle = 'A New List';
      listsPage.createNewList(newListTitle);
      expect(listsPage.lists.count()).toBe(4);
      listDetailPage = listsPage.navigateToList(newListTitle);
      expect(listDetailPage.listItems.count()).toBe(0);
    });

    it('should create a new item', function() {
      var targetList = 'Yummy Treats';
      listDetailPage = listsPage.navigateToList(targetList);
      var newItemName = 'A New Item';
      listDetailPage.createNewItem(newItemName);
      expect(listDetailPage.listItems.count()).toBe(4);
      expect(listDetailPage.getItemNameAtIndex(3)).toBe(newItemName);
    });

    it('should delete a list', function() {
      listsPage.deleteListAtIndex(0);
      expect(listsPage.lists.count()).toBe(3);
    });

    it('should delete an item', function() {
      var targetList = 'Healthy Veggies';
      listDetailPage = listsPage.navigateToList(targetList);
      listDetailPage.deleteItemAtIndex(0);
      expect(listDetailPage.listItems.count()).toBe(2);
    });

    

  });

});