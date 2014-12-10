;(function(){
  'use strict';
  angular.module('wishList')
    .config(function($routeProvider){
      $routeProvider
        .when('/form', {
          templateUrl: 'views/form.html',
          controller: 'ListController',
          controllerAs: 'listCtrl'
        })
        .when('/list', {
          templateUrl: 'views/list.html',
          controller: 'ListController',
          controllerAs: 'listCtrl'
        })
        .when('/:id', {
          templateUrl: 'views/item.html',
          controller: 'ItemController',
          controllerAs: 'itemCtrl'
        })
        .when('/:id/edit', {
          templateUrl: 'views/form.html',
          controller: 'EditController',
          controllerAs: 'listCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    })
}());

