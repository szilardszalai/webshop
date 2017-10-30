'use strict';

describe('bookSearch', function () {

    beforeEach(module('bookSearch'));

    describe('BookSearchController', function () {
        var $httpBackend, ctrl;
        var $scope;

        beforeEach(inject(function ($componentController, _$httpBackend_) {
            $httpBackend = _$httpBackend_;

            $scope = {};
            ctrl = $componentController('bookSearch', {$scope: $scope});
        }));


        it('should return empty item list for empty query parameters', function () {
            expect($scope.items).toEqual(undefined);
            expect($scope.shownItems).toBe(undefined);
            expect($scope.totalItems).toBe(undefined);
            expect($scope.errStatusText).toBe(undefined);

            ctrl.getBooks();

            expect($scope.items).toEqual([]);
            expect($scope.shownItems).toBe(0);
            expect($scope.totalItems).toBe(0);
            expect($scope.errStatusText).toBe(undefined);
        });

        it('should return empty item list for a query without results', function () {
            $httpBackend.expectGET('https://www.googleapis.com/books/v1/volumes?q=intitle:no+results+query')
                .respond(200, {kind: "books#volumes", totalItems: 0});

            expect($scope.items).toEqual(undefined);
            expect($scope.shownItems).toBe(undefined);
            expect($scope.totalItems).toBe(undefined);
            expect($scope.errStatusText).toBe(undefined);

            ctrl.queryParams = 'no+results+query';
            ctrl.getBooks();
            $httpBackend.flush();

            expect($scope.items).toEqual([]);
            expect($scope.shownItems).toBe(0);
            expect($scope.totalItems).toBe(0);
            expect($scope.errStatusText).toBe(undefined);
        });


        it('should return the one item for a query with one results', function () {
            $httpBackend.expectGET('https://www.googleapis.com/books/v1/volumes?q=intitle:single+result+query')
                .respond(200,
                    {
                        totalItems: 1, items:
                        [{
                            id: "ABC12345", volumeInfo: {
                                title: "Test Title", authors: ["D. Author"], description: "testDescription",
                                imageLinks: {smallThumbnail: "testSmallThumbnail", thumbnail: "testThumbnail"}
                            }
                        }]
                    }
                );

            expect($scope.items).toEqual(undefined);
            expect($scope.shownItems).toBe(undefined);
            expect($scope.totalItems).toBe(undefined);
            expect($scope.errStatusText).toBe(undefined);

            ctrl.queryParams = 'single+result+query';
            ctrl.getBooks();
            $httpBackend.flush();

            expect($scope.items[0].id).toBe("ABC12345");
            expect($scope.items[0].authors).toBe("D. Author");
            expect($scope.items[0].description).toBe("testDescription");
            expect($scope.items[0].smallThumbnail).toBe("testSmallThumbnail");
            expect($scope.items[0].thumbnail).toBe("testThumbnail");
            expect($scope.shownItems).toBe(1);
            expect($scope.totalItems).toBe(1);
            expect($scope.errStatusText).toBe(undefined);
        });


        it('should return with an error status text for client side error', function () {
            $httpBackend.expectGET('https://www.googleapis.com/books/v1/volumes?q=intitle:frequent+query')
                .respond(403, "Rate Limit Exceeded");

            expect($scope.items).toEqual(undefined);
            expect($scope.shownItems).toBe(undefined);
            expect($scope.totalItems).toBe(undefined);
            expect($scope.errStatusText).toBe(undefined);

            ctrl.queryParams = 'frequent+query';
            ctrl.getBooks();
            $httpBackend.flush();

            expect($scope.items).toEqual([]);
            expect($scope.shownItems).toBe(0);
            expect($scope.totalItems).toBe(0);
            expect($scope.errStatusText).toBe('Error while fetching books (403). Please try again later!');
        });

    });

});
