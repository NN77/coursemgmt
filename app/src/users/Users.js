import UserController from './UserController'
import UserService    from './UserService'

let moduleName = angular
      .module( "users", [ ] )
      .service("UserService"       , UserService)
      .controller("UserController" , UserController)
      .name;

export default moduleName;
