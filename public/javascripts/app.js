var app = angular.module('mean', ['ngRoute', 'ngAnimate', 'angular.filter', 'toaster']);

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
            templateUrl: 'user/items.html',
            controller: 'itemsController'
        })
        .when('/login', {
            templateUrl: 'user/login.html',
            controller: 'authController'
        })
        .when('/signup', {
            templateUrl: 'user/signup.html',
            controller: 'authController'
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

app.controller('itemsController', function ($scope) {
    $scope.items = [];
    $scope.newItem = {
        created_by: 'Me',
        name: '',
        description: '',
        category: '',
        online: 'false',
        created_at: ''
    };

    $scope.postItem = function () {
        $scope.newItem.created_at = Date.now();
        $scope.items.push($scope.newItem);
        $scope.newItem = {
            created_by: 'Me',
            name: '',
            description: '',
            category: '',
            online: 'false',
            created_at: ''
        };
    }
});