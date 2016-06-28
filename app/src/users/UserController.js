(function(){

  angular
       .module('users')
       .controller('UserController', [
          'userService', '$rootScope', '$mdSidenav', '$mdBottomSheet', '$timeout', '$log',
          UserController
       ]);

  function UserController( userService, $rootScope, $mdSidenav, $mdBottomSheet, $timeout, $log ) {
    var self = this;

    self.selected     = null;
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.updateUser   = updateUser;
    self.createUser   = createUser;
    self.mockup       = true;

    userService
          .loadAllUsers()
          .then(function(users) {
            var avatar1 = { avatar: "assets/svg/avatar-1.svg" }
            var avatar4 = { avatar: "assets/svg/avatar-4.svg" }
            angular.extend(users[0], avatar1);
            angular.extend(users[1], avatar4);
            self.users   = [].concat(users);
          });

          $rootScope.$on('updateUser', function(event, selectedUser) {
            updateUser(selectedUser);
          });

          $rootScope.$on('createUser', function(event, selectedUser) {
            createUser(selectedUser);
          });

    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
      $rootScope.$broadcast('users', self.selected);
    }

    function updateUser(selectedUser) {

        $mdBottomSheet.show({
          controllerAs  : "vm",
          templateUrl   : './src/users/view/updateSheet.html',
          controller    : [ '$mdBottomSheet', UpdateController],
          parent        : angular.element(document.getElementById('content'))
        });

        function UpdateController($mdBottomSheet) {
          this.mockup = true; // needed to simulate remote data service call(s) like POST or PUT
          this.user = selectedUser;
          this.newUser = {};
          this.save = function(newUser) {
            $log.debug(newUser);
            userService
                  .updateUser(selectedUser.id, newUser);
            $mdBottomSheet.hide();
          };
          this.cancel = function() {
            $mdBottomSheet.hide();
          }
        }
    }

    function createUser(selectedUser) {
      $mdBottomSheet.show({
        controllerAs  : "um",
        templateUrl   : './src/users/view/createSheet.html',
        controller    : ['$mdBottomSheet', CreateController],
        parent        : angular.element(document.getElementById('content'))
      });

      function CreateController($mdBottomShee) {
        this.create = function(newUser) {
          if(newUser) {
            $log.debug(newUser);
            userService
                  .createUser(newUser);
            $mdBottomSheet.hide();
          }
          else {
            $log.debug('Fill the form!');
          }
        };
      }
    }
  }

})();
