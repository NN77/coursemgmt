function UserController( UserService, $mdSidenav, $mdBottomSheet, $mdToast, $timeout, $log ) {
    var self = this;

    self.selected     = null;
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.updateUser   = updateUser;
    self.createUser   = createUser;
    self.mockup       = true;

    UserService
          .loadAllUsers()
          .then(function(users) {
            var avatar1 = { avatar: "assets/svg/avatar-1.svg" }
            var avatar4 = { avatar: "assets/svg/avatar-4.svg" }
            angular.extend(users[0], avatar1);
            angular.extend(users[1], avatar4);
            self.users   = [].concat(users);
            self.selected = users[0];
          });

    function selectUser ( user ) {
      $log.debug(user);
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
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
            UserService
                  .updateUser(selectedUser.id, newUser)
                  .finally(function(){
                    $mdBottomSheet.hide();
                  });
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
            UserService
                  .createUser(newUser)
                  .finally(function(){
                    $mdBottomSheet.hide();
                    //mockup
                    self.users = self.users.concat(newUser);
                  });
          }
          else {
            $log.debug('Fill the user form!');
            $mdToast.showSimple('Fill the user form!');
          }
        };
        this.cancel = function() {
          $mdBottomSheet.hide();
        }
      }
    }
  }

export default [
  'UserService', '$mdSidenav', '$mdBottomSheet', '$mdToast', '$timeout', '$log',
  UserController
  ];
