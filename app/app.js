'use strict';

angular.module('webshop', ['ngRoute', 'cart', 'bookSearch', 'bookDetail'])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when('/details', {template: '<book-detail></book-detail>'})
            .when('/cart/', {template: '<cart></cart>'})
            .when('/', {template: '<book-search></book-search>'})
            .otherwise({redirectTo: '/'});
    }]);
