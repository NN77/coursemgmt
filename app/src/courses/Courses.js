// (function(){
//   'use strict';
//
//   angular.module('courses', [ 'ngMaterial' ]);
//
// })();
import CourseController from './CourseController'
import CourseService    from './CourseService'

let moduleName = angular
      .module( "courses", [ ] )
      .service("CourseService"       , CourseService)
      .controller("CourseController" , CourseController)
      .name;

export default moduleName;
