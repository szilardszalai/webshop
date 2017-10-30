'use strict';

angular
    .module('bookDetail')
    .component('bookDetail', {
        templateUrl: 'book-detail/book-detail.template.html',
        controller: ['$window', 'BookDetailSessionService', 'ShoppingCartService',
            function BookDetailController($window, BookDetailSessionService, ShoppingCartService) {

                this.item = BookDetailSessionService.getItem();
                this.shoppingCartService = ShoppingCartService;

                this.goBackToPreviousPage = function () {
                    $window.history.back();
                };

            }
        ]
    });
