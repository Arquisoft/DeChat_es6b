// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
          
    plugins: [
      require("karma-coverage"),
      require("karma-coveralls"),
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("@angular-devkit/build-angular/plugins/karma")

    ],
    files:[
      'app/**/*.ts',
      'assets/js/libs/rdflib.min.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'app/**/*.ts': ['coverage']  
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    reporters: ["progress", "kjhtml" , "coverage-istanbul", 'coveralls'],
    
    coverageIstanbulReporter : {
      type: 'lcov',
      dir: require("path").join(__dirname, "../coverage"),
      reports: ["html", "lcovonly", "text-summary"],
      fixWebpackSourcePaths: true,
      combineBrowserReports: true,
      skipFilesWithNoCoverage: true,
      verbose: false
    },
    
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
     
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
     
    singleRun: true,
  });
};