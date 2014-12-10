;(function(){
  'use strict';

  angular.module('wishList', ['ngRoute'])
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
    .factory('listFactory', function($http, $location){
      
      function getAllItems(cb){
        $http.get('https://nss-wish-list.firebaseio.com/.json')
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log(err);
          });
       
      }

      function submitItem(item, cb){
        $http.post('https://nss-wish-list.firebaseio.com/.json', item)
          .success(function(data){
            // $location.path('/...');
          })
          .error(function(err){
            console.log(err);
          });
      }
      
      function editItem(id, newItem){
        var url = 'https://nss-wish-list.firebaseio.com/' + id + '.json';
        $http.put(url, newItem)
          .success(function(data){
            $location.path('/' + id);
          })
          .error(function(err){
            console.log(err);
          });
      }

      function getItem(id, cb){
        var url = 'https://nss-wish-list.firebaseio.com/' + id + '.json';
        $http.get(url)
          .success(function(data){
            cb(data);
          })
          .error(function(err){
            console.log(err);
          });
      }

      function deleteItem(id) {
        var url = 'https://nss-wish-list.firebaseio.com/' + id + '.json';
        $http.delete(url)
          .success(function(data){
            $location.path('/list');
          })
          .error(function(err){
            console.log(err);
          });
      }
      
      return {
        getAllItems: getAllItems,
        submitItem: submitItem,
        getItem: getItem,
        editItem: editItem,
        deleteItem: deleteItem
      };
    })
    .controller('ItemController', function($routeParams, listFactory){
      var vm = this;
      var id = $routeParams.id;
      vm.itemId = id;

      listFactory.getItem(id, function(data){
        vm.item = data;
      });

      vm.deleteItem = function(id){
        listFactory.deleteItem(id);
      };
    })
    .controller('EditController', function($routeParams, listFactory){
      var vm = this;
      var id = $routeParams.id;

      listFactory.getItem(id, function(data){
        vm.newItem = data;
      });

      vm.submitItem = function(){
        listFactory.editItem(id, vm.newItem);
      };

    })
    .controller('ListController', function($routeParams, listFactory){
      var vm = this;
      var id = $routeParams.id;
      vm.itemId = id;
      
      listFactory.getAllItems(function(data){
        vm.items = data;
      });

      vm.submitItem = function(){
        listFactory.submitItem(vm.newItem, function(data){
          vm.items[data.name] = vm.newItem;
          vm.newItem = {};
        });
      };
        
    });

}());
