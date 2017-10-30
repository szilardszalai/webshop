'use strict';

angular.module('bookSearch')
    .component('bookSearch', {
        templateUrl: 'book-search/book-search.template.html',
        controller: ['$scope', '$http', '$window', '$sessionStorage', 'BookDetailSessionService', 'ShoppingCartService',
            function BookSearchController($scope, $http, $window, $sessionStorage, BookDetailSessionService, ShoppingCartService) {
                var lastFetchedQueryParamsKey = 'lastFetchedQueryParams';
                this.queryParams = '';

                this.shoppingCartService = ShoppingCartService;
                this.bookDetailSessionService = BookDetailSessionService;

                this.init = function () {
                    this.queryParams = '';
                    if ($window.sessionStorage.getItem(lastFetchedQueryParamsKey) !== null) {
                        this.queryParams = $window.sessionStorage.getItem(lastFetchedQueryParamsKey);
                    }
                    this.getBooks();
                };

                $scope.dropUnusedPropertiesFrom = function (itemList) {
                    var cleanItemList = [];
                    for (var i = 0; i < itemList.length; i++) {
                        cleanItemList.push((function (fullItem) {
                            return {
                                id: fullItem.id,
                                title: fullItem.volumeInfo.title,
                                authors: fullItem.volumeInfo.authors !== undefined ? fullItem.volumeInfo.authors.join(', ') : '(unknown)',
                                description: fullItem.volumeInfo.description !== undefined ? fullItem.volumeInfo.description : '',
                                thumbnail: fullItem.volumeInfo.imageLinks !== undefined ? fullItem.volumeInfo.imageLinks.thumbnail : 'img/no_cover.jpg',
                                smallThumbnail: fullItem.volumeInfo.imageLinks !== undefined ? fullItem.volumeInfo.imageLinks.smallThumbnail : 'img/no_cover.jpg'
                            };
                        })(itemList[i]));
                    }
                    return cleanItemList;
                };

                this.getBooks = function () {
                    if (this.queryParams === '') {
                        $scope.items = [];
                        $scope.shownItems = 0;
                        $scope.totalItems = 0;
                        $scope.errStatusText = undefined;
                        return;
                    }

                    $window.sessionStorage.setItem(lastFetchedQueryParamsKey, this.queryParams);
                    return $http.get('https://www.googleapis.com/books/v1/volumes?q=intitle:' + this.queryParams.replace(" ", "+"))
                        .then(
                            function (response) {
                                $scope.data = response.data;
                                if (response.data.totalItems === 0) {
                                    $scope.items = [];
                                    $scope.shownItems = 0;
                                    $scope.totalItems = 0;
                                    $scope.errStatusText = undefined;
                                } else {
                                    $scope.items = $scope.dropUnusedPropertiesFrom(response.data.items);
                                    $scope.shownItems = $scope.items.length;
                                    $scope.totalItems = response.data.totalItems;
                                    $scope.errStatusText = undefined;
                                }
                            },
                            function (errResponse) {
                                console.error('Error while fetching books: ' + errResponse.status);
                                $scope.errStatusText = 'Error while fetching books (' + errResponse.status + "). Please try again later!";
                                $scope.items = [];
                                $scope.shownItems = 0;
                                $scope.totalItems = 0;
                            }
                        );
                };
            }
        ]
    });

