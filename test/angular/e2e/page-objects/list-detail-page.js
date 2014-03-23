'require strict'

//page object pattern for protractor e2e testing
var ListDetailPage = function () {
  var ListsPage = require('./lists-page.js');

  this.listTitle = element.all(by.binding('text')).first(); //binding in custom directive
  this.listItems = element.all(by.repeater('item in items'));

  this.get = function() {
    browser.get('/');
    return this;
  };

  this.navigateToListsPage = function() {
    element(by.linkText('Back')).click();
    return new ListsPage();
  };

  this.editListTitle = function(title) {
    element.all(by.css('button')).first().click();
    element(by.model('text')).clear();
    element(by.model('text')).sendKeys(title);
    element.all(by.css('button')).get(1).click();

    return this;
  };

  this.getItemNameAtIndex = function(index) {
    return this.listItems.get(index).findElement(by.binding('text')).getText();
  };

  this.createNewItem = function(name) {
    element(by.model('newItemName')).sendKeys(name);
    element(by.name('submit')).click();
    return this;
  };

  this.editItemNameAtIndex = function(index, name) {
    var listItem = this.listItems.get(index);
    listItem.findElement(by.css('[ng-click="toggleEdit()"]')).click();
    listItem.findElement(by.model('text')).clear();
    listItem.findElement(by.model('text')).sendKeys(name);
    listItem.findElement(by.css('[ng-click="saveEdit()"]')).click();

    return this;
  };

  this.deleteItemAtIndex = function(index) {
    this.listItems.get(index).findElement(by.css('[ng-click="deleteItem($index)"]')).click();
    return this;
  };

};

//return a ListDetailPage object when this JS file is 'require()'-ed
module.exports = ListDetailPage;