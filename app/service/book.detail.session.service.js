angular
    .module('bookDetailSessionService', ['ngStorage'])
    .service('BookDetailSessionService', ['$window', function ($window) {

        var item = undefined;
        var lastShownBookDetailId = 'lastShownBookDetailId';

        return {
            setItem: function (value) {
                item = value;
                $window.sessionStorage.setItem(lastShownBookDetailId, JSON.stringify(item));
            },
            getItem: function () {
                if (item === undefined) {
                    return JSON.parse($window.sessionStorage.getItem(lastShownBookDetailId));
                }
                return item;
            }
        };
    }]);