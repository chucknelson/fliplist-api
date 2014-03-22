'require strict'

//page object pattern for protractor e2e testing
var ListDetailPage = function () {
  this.listTitle = element.all(by.binding('text')).first().getText(); //binding in custom directive
  this.listItems = element.all(by.repeater('item in items'));

  this.get = function() {
    browser.get('/');
  };

};

//return a ListDetailPage object when this JS file is 'require()'-ed
module.exports = ListDetailPage;