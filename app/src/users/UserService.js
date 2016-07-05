function UserService($http, $q, $mdToast){
    return {
      loadAllUsers : function() {
        return $http.get('http://private-anon-1344a5b3d-coursemgmt.apiary-mock.com/users')
          .then(
              function(response){
                  return response.data.data.users;
              },
              function(errResponse){
                  $mdToast.showSimple('Error while fetching users');
                  return $q.reject(errResponse);
              }
          );
      },
      updateUser : function(id, user) {
        return $http.put('http://private-anon-7a870b364-coursemgmt.apiary-mock.com/users/'+id, user)
          .then(
              function(){
                  $mdToast.showSimple('Update User success');
              },
              function(errResponse){
                  $mdToast.showSimple('Error while updating user');
                  return $q.reject(errResponse);
              }
          );
      },
      createUser : function(user) {
        return $http.post('http://private-anon-7a870b364-coursemgmt.apiary-mock.com/users', user)
          .then(
              function(){
                  $mdToast.showSimple('User created successfully');
              },
              function(errResponse){
                  $mdToast.showSimple('Error while creating user');
                  return $q.reject(errResponse);
              }
          );
      }
    };
  }
  export default [ '$http', '$q', '$mdToast', UserService ];
