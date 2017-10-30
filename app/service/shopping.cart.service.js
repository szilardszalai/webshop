angular.module('shoppingCartService', ['ngRoute', 'ngStorage'])
    .service('ShoppingCartService', ['$window', function ($window) {

        var cartKey = 'cart';
        var cartList = [];

        this.addToCart = function (itemToAdd) {
            if ($window.sessionStorage.getItem(cartKey) !== null) {
                cartList = JSON.parse($window.sessionStorage.getItem(cartKey));
            }
            if (cartList.indexOf(itemToAdd.id) === -1) {
                cartList.push(itemToAdd.id);
            }

            $window.sessionStorage.setItem(cartKey, JSON.stringify(cartList));
            $window.sessionStorage.setItem(itemToAdd.id, JSON.stringify(itemToAdd));
        };

        this.getList = function () {
            if ($window.sessionStorage.getItem(cartKey) !== null) {
                cartList = JSON.parse($window.sessionStorage.getItem(cartKey));
            }
            return cartList;
        };

        this.getItem = function (id) {
            return JSON.parse($window.sessionStorage.getItem(id));
        };

        this.getAllItems = function () {
            var itemsList = [];
            if ($window.sessionStorage.getItem(cartKey) !== null) {
                cartList = JSON.parse($window.sessionStorage.getItem(cartKey));
            }
            for (var i = 0; i < cartList.length; i++) {
                itemsList.push(JSON.parse($window.sessionStorage.getItem(cartList[i])));
            }
            return itemsList;
        };

        this.removeFromCart = function (id) {
            if ($window.sessionStorage.getItem(cartKey) !== null) {
                cartList = JSON.parse($window.sessionStorage.getItem(cartKey));
            }
            if (cartList.indexOf(id) !== -1) {
                cartList.splice(cartList.indexOf(id), 1);
            }
            $window.sessionStorage.setItem(cartKey, JSON.stringify(cartList));
        };

        this.isInCart = function (id) {
            if ($window.sessionStorage.getItem(cartKey) !== null) {
                cartList = JSON.parse($window.sessionStorage.getItem(cartKey));
            }
            return cartList.indexOf(id) !== -1;
        };

    }]);