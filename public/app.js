(function() {
'use strict';

angular.module('SchoolApp', [])
.controller('SchoolsAppController', SchoolsAppController)
.controller('SchoolAppController', SchoolAppController)
.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    }); 
}]);

SchoolsAppController.$inject = ['$http', '$scope'];
function SchoolsAppController($http, $scope) {
  $scope.schools = [];
  $http.get('schoolinfo')
    .then(function(result) {
      $scope.schools = result.data;
  });
}

SchoolAppController.$inject = ['$http', '$scope', '$location'];
function SchoolAppController($http, $scope, $location) {

  $scope.school = "";
  $http.get('schoolinfo/' + $location.search().school)
    .then(function(result) {
      $scope.school = result.data;
  });
}

})();