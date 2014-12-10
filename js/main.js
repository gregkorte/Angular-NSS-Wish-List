;(function(){
  'use strict';

  angular.module('wishList', ['ngRoute'])
    .config(function($routeProvider){
        
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
            cb(data);
            // $location.path('/...');
          })
          .error(function(err){
            console.log(err);
          });
       }
      
      return {
        getAllItems: getAllItems,
        submitItem: submitItem
      
      };
    })
    .controller('ListController', function(listFactory){
      var vm = this;
      
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
