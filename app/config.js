System.config({
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "app/*": "src/*.js",
    "courses/*": "src/courses/*.js",
    "users/*": "src/users/*.js",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*",
    "node_modules/*": "node_modules/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.5.5",
    "angular-animate": "github:angular/bower-angular-animate@1.5.5",
    "angular-aria": "github:angular/bower-angular-aria@1.5.5",
    "angular-material": "github:angular/bower-material@master",
    "angular-messages": "github:angular/bower-angular-messages@1.5.5",
    "angular-route": "github:angular/bower-angular-route@1.5.5",
    "css": "github:systemjs/plugin-css@0.1.21",
    "json": "github:systemjs/plugin-json@0.1.0",
    "moment": "npm:moment@2.0.0",
    "text": "github:systemjs/plugin-text@0.0.2",
    "traceur": "github:jmcriffey/bower-traceur@0.0.92",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.92",
    "github:angular/bower-angular-animate@1.5.5": {
      "angular": "github:angular/bower-angular@1.5.5"
    },
    "github:angular/bower-angular-aria@1.5.5": {
      "angular": "github:angular/bower-angular@1.5.5"
    },
    "github:angular/bower-angular-messages@1.5.5": {
      "angular": "github:angular/bower-angular@1.5.5"
    },
    "github:angular/bower-angular-route@1.5.5": {
      "angular": "github:angular/bower-angular@1.5.5"
    },
    "github:angular/bower-material@master": {
      "angular": "github:angular/bower-angular@1.5.5",
      "angular-animate": "github:angular/bower-angular-animate@1.5.5",
      "angular-aria": "github:angular/bower-angular-aria@1.5.5",
      "angular-messages": "github:angular/bower-angular-messages@1.5.5",
      "css": "github:systemjs/plugin-css@0.1.21"
    }
  }
});
