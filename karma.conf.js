module.exports = function (config) {
    config.set({
        basePath: './app',
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/ngStorage/ngStorage.js',
            '**/*.module.js',
            '*!(.module|.test).js',
            '!(bower_components)/**/*!(.module|.test).js',
            '**/*.test.js'
        ],
        autoWatch: true,
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine'
        ]
    });
};
