;(function(){
  'use strict';
  angular.module('wishList')
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
            $location.path('/list');
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
}());
