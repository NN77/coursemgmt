(function(){

  angular
       .module('courses')
       .controller('CourseController', [
          'courseService', '$rootScope', '$mdSidenav', '$mdBottomSheet', '$timeout', '$log',
          CourseController
       ]);

  function CourseController( courseService, $rootScope, $mdSidenav, $mdBottomSheet, $timeout, $log ) {
    var self = this;

    self.selected       = null;
    self.courses        = [ ];
    self.selectCourse   = selectCourse;
    self.createCourse   = createCourse;
    self.mockup         = true;

    courseService
          .loadAllCourses()
          .then(function(courses) {
            var avatar1 = { avatar: "assets/svg/avatar-1.svg" }
            var avatar4 = { avatar: "assets/svg/avatar-4.svg" }
            angular.extend(courses[0].candidates[0], avatar1);
            angular.extend(courses[0].candidates[1], avatar4);
            self.courses   = [].concat(courses);
            self.selected = courses[0];
            $rootScope.$broadcast('courses', self.selected);
          });

          $rootScope.$on('editCourseUsers', function(event, selectedCourse) {
            editCourseUsers(selectedCourse);
          });

          $rootScope.$on('createCourse', function(event, selectedCourse) {
            createCourse(selectedCourse);
          });

    function selectCourse ( course ) {
      self.selected = angular.isNumber(course) ? $scope.courses[course] : course;
      $rootScope.$broadcast('courses', self.selected);
    }

    function createCourse(selectedCourse) {

        $mdBottomSheet.show({
          controllerAs  : "cm",
          templateUrl   : './src/courses/view/createSheet.html',
          controller    : [ '$mdBottomSheet', CreateController],
          parent        : angular.element(document.getElementById('content'))
        });

        function CreateController($mdBottomSheet) {
          this.create = function(newCourse) {
            var begin = moment(newCourse.begin).format('DDMMYYYY');
            var end   = moment(newCourse.end).format('DDMMYYYY');
            var parsed = {begin: begin, end: end, title: newCourse.title, candidate_limit: newCourse.candidate_limit };
            $log.debug(parsed);
            courseService
                  .createCourse(parsed);
            $mdBottomSheet.hide();
          };
          this.cancel = function() {
            $mdBottomSheet.hide();
          }
        }
    }

    function editCourseUsers(selectedCourse) {
      $mdBottomSheet.show({
        controllerAs  : "vm",
        templateUrl   : './src/courses/view/updateSheet.html',
        controller    : ['$mdBottomSheet', UpdateController],
        parent        : angular.element(document.getElementById('content'))
      });

      function UpdateController( $mdBottomShee ) {
        this.course = selectedCourse;
        this.register = function(userId) {
          var user_id = { user_id: userId }
          $log.debug(user_id);
          courseService
                .registerUser(selectedCourse.id, user_id);
          $mdBottomSheet.hide();
        };
        this.remove = function(userId) {
          var user_id = { user_id: userId }
          courseService
                .removeUser(selectedCourse.id, user_id);
          $mdBottomSheet.hide();
        }
      }
    }
  }

})();
