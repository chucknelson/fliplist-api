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

  this.moveItemToIndex = function(sourceIndex, targetIndex) {
    var sourceItem, targetItem;
    sourceItem = this.listItems.get(sourceIndex);
    targetItem = this.listItems.get(targetIndex);

    //work through elements via webdriver promises
    //drag and drop when we have required data
    var yOffset;
    targetItem.getLocation().
      then(function(targetLocation) { 
        yOffset = targetLocation.y;
      }).
      then(function() {
        return sourceItem.getLocation();
      }).
      then(function(sourceLocation) {
        yOffset -= sourceLocation.y;
        var yAdjust = yOffset < 0 ? -5 : 5;
        yOffset += yAdjust; //required to trigger a sort with jQuery UI sortable behavior, see comment below
      }).
      then(function() {
        browser.actions().dragAndDrop(sourceItem, {x: 0, y: yOffset}).perform();        
      });

    //can't use convenience method below because dragging directly on top of another item does not trigger a sort (at least via jQuery UI sortable)
    //browser.actions().dragAndDrop(sourceItem, targetItem).perform();

    return this;
  };

  

};

//return a ListDetailPage object when this JS file is 'require()'-ed
module.exports = ListDetailPage;