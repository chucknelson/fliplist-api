describe('FlipList', function() {
  var ptor;

  beforeEach(function() {
    ptor = protractor.getInstance(); //works like browser()
  });

  describe('Lists View', function() {
    var queryInput, orderProp, lists;

    beforeEach(function () {
      ptor.get('/');

      lists = element.all(by.repeater('list in lists'));
    });

    it('should have 3 lists', function() {
      expect(lists.count()).toBe(3);
    });

  });
});