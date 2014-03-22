'use strict'

describe('FlipList', function() {
  var ListsPage = require('./page-objects/lists-page.js');

  beforeEach(function() {
    //empty for now
  });

  describe('Lists View', function() {
    var listsPage = new ListsPage();

    beforeEach(function () {
      listsPage.get('/');
    });

    it('should display 3 lists', function() {
      expect(listsPage.lists.count()).toBe(3);
    });
  });

  describe('List Detail View', function() {
    var listsPage = new ListsPage();
    var listDetailPage;

    beforeEach(function () {
      listsPage.get('/');
    });

    it('should display an empty list', function() {
      listDetailPage = listsPage.navigateToListAtIndex(0);
      expect(listDetailPage.listTitle).toBe('Empty List');
      expect(listDetailPage.listItems.count()).toBe(0);
    });

    it('should display a list with items', function() {
      listDetailPage = listsPage.navigateToListAtIndex(1);
      expect(listDetailPage.listTitle).not.toBe('Empty List');
      expect(listDetailPage.listItems.count()).toBe(3);
    });

  });
});