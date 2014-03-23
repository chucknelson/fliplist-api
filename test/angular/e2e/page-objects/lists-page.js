'use strict'

//page object pattern for protractor e2e testing
var ListsPage = function () {
  var ListDetailPage = require('./list-detail-page.js');

  this.lists = element.all(by.repeater('list in lists'));

  this.get = function() {
    browser.get('/');
    return this;
  };

  this.navigateToListAtIndex = function(index) {
    this.lists.get(index).findElement(by.css('a')).click();
    return new ListDetailPage();
  };

  this.navigateToList = function(title) {
    element(by.linkText(title)).click();
    return new ListDetailPage();
  };

  this.createNewList = function(title) {
    element(by.model('newListTitle')).sendKeys(title);
    element(by.name('submit')).click();
    return this;
  };

  this.deleteListAtIndex = function(index) {
    this.lists.get(index).findElement(by.css('button')).click();
    return this;
  };

};

//return a ListsPage object when this JS file is 'require()'-ed
module.exports = ListsPage;