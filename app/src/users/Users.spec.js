'use strict';

describe('Users module', function() {

  beforeEach(module('users'));

  describe('user controller', function(){

    it('UserController should be defined', inject(function($controller) {
      //spec body
      var usrctrl = $controller('UserController');
      expect(usrctrl).toBeDefined();
    }));

  });
});
