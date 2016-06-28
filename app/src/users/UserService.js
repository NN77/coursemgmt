(function(){
  'use strict';

  angular.module('users')
         .service('userService', ['$http', '$q', UserService]);

  function UserService($http, $q){
    return {
      loadAllUsers : function() {
        return $http.get('http://private-anon-1344a5b3d-coursemgmt.apiary-mock.com/users')
          .then(
              function(response){
                  return response.data.data.users;
              },
              function(errResponse){
                  console.error('Error while fetching users');
                  return $q.reject(errResponse);
              }
          );
      },
      updateUser : function(id, user) {
        return $http.put('http://private-anon-7a870b364-coursemgmt.apiary-mock.com/users/'+id, user)
          .then(
              function(){
                  console.log('Update User success');
              },
              function(errResponse){
                  console.error('Error while updating user');
                  return $q.reject(errResponse);
              }
          );
      }
    };
  }

})();
