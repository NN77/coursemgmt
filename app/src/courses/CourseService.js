(function(){
  'use strict';

  angular.module('courses')
         .service('courseService', ['$http', '$q', CourseService]);

  function CourseService($http, $q){
    return {
      loadAllCourses : function() {
        return $http.get('http://private-anon-7a870b364-coursemgmt.apiary-mock.com/courses')
          .then(
              function(response){
                  return response.data.data.courses;
              },
              function(errResponse){
                  console.error('Error while fetching courses');
                  return $q.reject(errResponse);
              }
          );
      },
      createCourse : function(course) {
        return $http.post('http://private-anon-7a870b364-coursemgmt.apiary-mock.com/courses', course)
          .then(
              function(){
                  console.log('Course created successfully');
              },
              function(errResponse){
                  console.error('Error while creating course');
                  return $q.reject(errResponse);
              }
          );
      },
      registerUser : function(courseId, userId) {
        return $http.post('http://private-anon-7a870b364-coursemgmt.apiary-mock.com/courses/'+courseId+'/register', userId)
          .then(
              function(){
                  console.log('User registered successfully');
              },
              function(errResponse){
                  console.error('Error while registering new user');
                  return $q.reject(errResponse);
              }
          );
      },
      removeUser : function(courseId, userId) {
        return $http.delete('http://private-anon-7a870b364-coursemgmt.apiary-mock.com/courses/'+courseId+'/register', userId)
          .then(
              function(){
                  console.log('User removed successfully');
              },
              function(errResponse){
                  console.error('Error while removing user');
                  return $q.reject(errResponse);
              }
          );
      }
    };
  }

})();
