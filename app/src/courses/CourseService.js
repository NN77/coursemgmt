function CourseService($http, $q, $mdToast){
    return {
      loadAllCourses : function() {
        return $http.get('http://private-anon-7a870b364-coursemgmt.apiary-mock.com/courses')
          .then(
              function(response){
                  return response.data.data.courses;
              },
              function(errResponse){
                  $mdToast.showSimple('Error while fetching courses');
                  return $q.reject(errResponse);
              }
          );
      },
      createCourse : function(course) {
        return $http.post('http://private-anon-7a870b364-coursemgmt.apiary-mock.com/courses', course)
          .then(
              function(){
                  $mdToast.showSimple('Course created successfully');
              },
              function(errResponse){
                  $mdToast.showSimple('Error while creating course');
                  return $q.reject(errResponse);
              }
          );
      },
      registerUser : function(courseId, userId) {
        return $http.post('http://private-anon-7a870b364-coursemgmt.apiary-mock.com/courses/'+courseId+'/register', userId)
          .then(
              function(){
                  $mdToast.showSimple('User registered successfully');
              },
              function(errResponse){
                  $mdToast.showSimple('Error while registering new user');
                  return $q.reject(errResponse);
              }
          );
      },
      removeUser : function(courseId, userId) {
        return $http.delete('http://private-anon-7a870b364-coursemgmt.apiary-mock.com/courses/'+courseId+'/register', userId)
          .then(
              function(){
                  $mdToast.showSimple('User removed successfully');
              },
              function(errResponse){
                  $mdToast.showSimple('Error while removing user');
                  return $q.reject(errResponse);
              }
          );
      }
    };
  }

  export default [
    '$http', '$q', '$mdToast', '$log',
    CourseService
  ]
