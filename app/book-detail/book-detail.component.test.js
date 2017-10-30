'use strict';

describe('bookDetail', function () {

    beforeEach(module('bookDetail'));

    describe('BookDetailController', function () {
        var ctrl;
        var BookDetailSessionServiceMock;

        beforeEach(function () {
            BookDetailSessionServiceMock = {
                getItem: function () {
                    return {key: "testValue"}
                }
            };
        });

        beforeEach(inject(function ($componentController) {
            ctrl = $componentController('bookDetail', {
                BookDetailSessionService: BookDetailSessionServiceMock
            });
        }));

        it('should initialize item from BookDetailService', function () {
            expect(ctrl.item).toEqual({key: "testValue"});
        });

    });
});
