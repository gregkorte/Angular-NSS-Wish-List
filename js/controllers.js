;(function(){
  'use strict';
  angular.module('wishList')
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
    })
}());

