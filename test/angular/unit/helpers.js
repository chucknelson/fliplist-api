//helper function to compile, bind, and update/populate directives for unit testing;
//from http://blog.revolunet.com/blog/2013/12/05/unit-testing-angularjs-directive/
function compileDirective(scope, tpl) {
  var compiledTpl;
  // compile a fresh directive with the given template, or default
  // compile the tpl with the $rootScope created above
  // wrap our directive inside a form to be able to test
  // that our form integration works well (via ngModelController)
  if (!tpl) tpl = '<fl-editable-text ng-model="testList.title"></fl-editable-text>';
  // inject allows you to use AngularJS dependency injection
  // to retrieve and use other services
  inject(function($compile) {
      //compile template, binding to passed in scope
      compiledTpl = $compile(tpl)(scope); 
  });

  //update template/view now that it is bound to the scope
  scope.$digest();

  //return bound and updated template
  return compiledTpl;
}