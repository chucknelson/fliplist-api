module.exports = function(config){
  config.set({
    basePath : '../../../',

    files : [
      'vendor/assets/javascripts/angular-1.2.14/angular.js',
      'vendor/assets/javascripts/angular-1.2.14/angular-*.js',
      'app/assets/javascripts/angular/*.js',
      'test/angular/unit/**/*.js',
      'app/views/directives/**/*.html'
    ],

    exclude : [
      'vendor/assets/javascripts/angular-1.2.14/angular-loader.js',
      'vendor/assets/javascripts/angular-1.2.14/*.min.js',
      'vendor/assets/javascripts/angular-1.2.14/angular-scenario.js'
    ],

    autoWatch : false,
    singleRun : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-junit-reporter',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-script-launcher',
            'karma-html2js-preprocessor',
            'karma-ng-html2js-preprocessor'
            ],

    reporters: ['progress'],

    preprocessors : {
      'app/views/directives/**/*.html': 'ng-html2js'
    },

    ngHtml2JsPreprocessor : {
      stripPrefix: 'app/views/'
    },

    //if using junit reporter
    junitReporter : {
      outputFile: 'test/angular/test_out/unit.xml',
      suite: 'unit'
    }
  });
};