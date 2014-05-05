'use strict'

describe('FlipList Services', function() {
  var $httpBackend, userLogin, testUser;

  beforeEach(function() {
    module('ngRoute');
    module('flipListServices');
    inject(function(_$httpBackend_, _userLogin_) {
      $httpBackend = _$httpBackend_;
      userLogin = _userLogin_;
    });

    testUser = {id: 1, email: 'user@user.com', password: 'password' };

  });

  describe('userLogin', function() {

    beforeEach(inject(function() {
      expect(userLogin.currentUser()).toBeUndefined();
    }));

    it('should allow a user to login', function() {
      $httpBackend.expectPOST('api/login').respond(200, testUser);
      userLogin.login(testUser.email, testUser.password);
      $httpBackend.flush();

      expect(userLogin.currentUser()).toEqual(testUser);   
    });

    it('should not allow a user with invalid credentials to login', function() {
      $httpBackend.expectPOST('api/login').respond(400, {});
      userLogin.login(testUser.email, 'incorrect password');
      $httpBackend.flush();

      expect(userLogin.currentUser()).toBeUndefined();

    });

  });

});