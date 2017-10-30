'use strict';

describe('cart', function () {

    beforeEach(module('cart'));

    describe('CartController', function () {
        var ctrl;
        var ShoppingCartServiceMock;

        beforeEach(function () {
            ShoppingCartServiceMock = {
                getAllItems: function () {
                    return {
                        id: "ABC12345", title: "Test Title",
                        authors: "D. Author", description: "testDescription",
                        smallThumbnail: "testSmallThumbnail", thumbnail: "testThumbnail"
                    }
                }
            };
        });

        beforeEach(inject(function ($componentController) {
            ctrl = $componentController('cart', {
                ShoppingCartService: ShoppingCartServiceMock
            });
        }));

        it('should initialize items from ShoppingCartService', function () {
            expect(ctrl.items.id).toBe("ABC12345");
            expect(ctrl.items.title).toBe("Test Title");
            expect(ctrl.items.authors).toBe("D. Author");
            expect(ctrl.items.smallThumbnail).toBe("testSmallThumbnail");
            expect(ctrl.items.thumbnail).toBe("testThumbnail");
        });

        it('should update items from ShoppingCartService', function () {
            ctrl.items = undefined;

            expect(ctrl.items).toBe(undefined);

            ctrl.updateItems();

            expect(ctrl.items.id).toBe('ABC12345');
            expect(ctrl.items.title).toBe("Test Title");
            expect(ctrl.items.authors).toBe("D. Author");
            expect(ctrl.items.smallThumbnail).toBe("testSmallThumbnail");
            expect(ctrl.items.thumbnail).toBe("testThumbnail");
        });


    });

});
