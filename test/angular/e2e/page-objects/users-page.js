'use strict'

//page object pattern for protractor e2e testing
var UsersPage = function () {
  var ListsPage = require('./lists-page.js');

  this.users = element.all(by.repeater('user in users'));

  this.get = function() {
    browser.get('/');
    return this;
  };

  this.navigateToUserAtIndex = function(index) {
    this.users.get(index).findElement(by.css('a')).click();
    return new ListsPage();
  };

  this.navigateToList = function(title) {
    element(by.linkText(title)).click();
    return new ListsPage();
  };

};

//return a UsersPage object when this JS file is 'require()'-ed
module.exports = UsersPage;