'use strict'

//page object pattern for protractor e2e testing
var ListsPage = function () {
  var ListDetailPage = require('./list-detail-page.js');

  this.lists = element.all(by.repeater('list in lists'));

  this.get = function() {
    browser.get('/');
  };

  this.navigateToListAtIndex = function(index) {
    this.lists.get(index).findElement(by.css('a')).click();
    return new ListDetailPage();
  };

};

//return a ListsPage object when this JS file is 'require()'-ed
module.exports = ListsPage;