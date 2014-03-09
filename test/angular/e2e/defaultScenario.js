describe('FlipList', function() {
  var ptor;

  beforeEach(function() {
    ptor = protractor.getInstance(); //works like browser()
  });

  describe('Lists View', function() {
    var lists; 

    beforeEach(function () {
      ptor.get('/');

      lists = element.all(by.repeater('list in lists'));
    });

    it('should display 3 lists', function() {
      expect(lists.count()).toBe(3);
    });
  });

  describe('List Detail View', function() {
    var listLinks, listLink, listItems;

    beforeEach(function () {
      ptor.get('/');
      listLinks = element.all(by.repeater('list in lists'));
    });

    it('should display an empty list', function() {
      listLink = listLinks.get(0).findElement(by.css('a'));
      expect(listLink.getText()).toBe('Empty List');
      
      listLink.click();
      listItems = element.all(by.repeater('item in list.items'));
      expect(listItems.count()).toBe(0);
    });

    it('should display a list with items', function() {
      listLink = listLinks.get(1).findElement(by.css('a'));
      expect(listLink.getText()).not.toBe('Empty List');

      listLink.click();
      listItems = element.all(by.repeater('item in list.items'));
      expect(listItems.count()).toBe(3);
    });
  });
});