'use strict';

angular.module('blindsSiteApp')
  .controller('MainCtrl', function($scope, $http, socket, Product) {
       $scope.products = Product.query().slice(3);
});
