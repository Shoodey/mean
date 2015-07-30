var app = angular.module('mean', ['ngRoute', 'ngAnimate', 'ngResource', 'angular.filter', 'toaster']);

app.run(function ($rootScope, $http, toaster) {
    $rootScope.authenticated = false;
    $rootScope.current_user = '';

    $rootScope.logout = function () {
        $http.get('auth/logout');
        toaster.pop('error', null, "You are now logged out!");
        $rootScope.authenticated = false;
        $rootScope.current_user = '';
    };
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'main.html',
            controller: 'mainController'
        })
        .when('/login', {
            templateUrl: 'user/login.html',
            controller: 'authController'
        })
        .when('/signup', {
            templateUrl: 'user/signup.html',
            controller: 'authController'
        })
        .when('/items', {
            templateUrl: 'user/items.html',
            controller: 'itemsController'
        });
});

app.controller('authController', function ($scope, $http, $rootScope, $location, toaster) {

    $scope.login = function () {
        $http.post('/auth/login', $scope.user).success(function (data) {
            if (data.state == 'success') {
                toaster.pop('success', null, "You are now logged in!");
                $rootScope.authenticated = true;
                $rootScope.logged_user = data.user;
                $location.path('/');
            } else {
                toaster.pop('error', null, "Something went wrong!");
            }
        });
    };

    $scope.signup = function () {
        $http.post('/auth/signup', $scope.user).success(function (data) {
            if (data.state == 'success') {
                toaster.pop('success', null, "You are now logged in!");
                $rootScope.authenticated = true;
                $rootScope.logged_user = data.user;
                $location.path('/');
            } else {
                toaster.pop('error', null, "Something went wrong!");
            }
        });
    };
});

app.factory('itemsService', function ($http) {
    return {
        // get all the items
        get: function () {
            return $http.get('/api/items');
        },

        // save a iem (pass in iem data)
        save: function (newItem) {
            return $http({
                method: 'POST',
                url: '/api/items',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(newItem)
            });
        },

        update: function (data) {
            return $http({
                method: 'PUT',
                url: '/api/items',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(data)
            });
        },

        // destroy a iem
        destroy: function (id) {
            return $http.delete('/api/items/' + id);
        }
    }
});

app.controller('itemsController', function (itemsService, $scope, $rootScope, toaster, $http) {
    $scope.newItem = {};

    itemsService.get()
        .success(function (getData) {
            $scope.items = getData;
        });

    $scope.postItem = function () {
        itemsService.save($scope.newItem)
            .success(function (data) {
                itemsService.get()
                    .success(function (getData) {
                        $scope.items = getData;
                        toaster.pop('success', $scope.newItem.name, "has been created!");
                        $scope.newItem = {};
                    });
            })
            .error(function (data) {
                console.log(data);
                toaster.pop('error', null, "Something went wrong!");
            });
    };

    $scope.editingData = [];
    $scope.itemsList = itemsService.get();

    for (var i = 0, length = $scope.itemsList.length; i < length; i++) {
        $scope.editingData[$scope.items[i]._id] = false;
    }
    $scope.modifyItem = function(tableData){
        $scope.editingData[tableData._id] = true;
        console.log(tableData);
    };

    $scope.updateItem = function(tableData){
        $scope.editingData[tableData._id] = false;
        itemsService.update($scope.newItem)
            .success(function (data) {
                itemsService.get()
                    .success(function (getData) {
                        $scope.items = getData;
                        toaster.pop('success', $scope.newItem.name, "has been updated!");
                        $scope.newItem = {};
                    });
            })
            .error(function (data) {
                toaster.pop('error', null, "Something went wrong!");
            });
    };

    /*$scope.updateItem = function(item){
        $scope.newItem = item;

        itemsService.update($scope.newItem)
            .success(function (data) {
                itemsService.get()
                    .success(function (getData) {
                        $scope.items = getData;
                        toaster.pop('success', $scope.newItem.name, "has been updated!");
                        $scope.newItem = {};
                    });
            })
            .error(function (data) {
                console.log(data);
                toaster.pop('error', null, "Something went wrong!");
            });

    };*/

    $scope.deleteItem = function (id) {
        itemsService.destroy(id)
            .success(function (data) {
                itemsService.get()
                    .success(function (getData) {
                        toaster.pop('error', null, "The item has been deleted!");
                        $scope.items = getData;
                    });

            });
    };


});