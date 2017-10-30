'use strict';

angular.module('cart')
    .component('cart', {
        templateUrl: 'cart/cart.template.html',
        controller: ['BookDetailSessionService', 'ShoppingCartService',
            function CartController(BookDetailSessionService, ShoppingCartService) {
                this.shoppingCartService = ShoppingCartService;
                this.bookDetailSessionService = BookDetailSessionService;
                this.items = this.shoppingCartService.getAllItems();

                this.updateItems = function () {
                    this.items = this.shoppingCartService.getAllItems();
                };

            }
        ]
    });