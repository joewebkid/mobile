// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic','ionic.service.core','ngCordova', 'ionic.service.push','ionic.service.core','ngCordova', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])
 
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification) {
		    var payload = notification.payload;
		    console.log(notification, payload);
		  },
		  "onRegister": function(data) {
		    console.log(data.token);
		  }
    });
    push.register(function(token) {
      console.log("My Device token:",token.token);
      alert(token.token);
      console.log(token.token);
      push.saveToken(token);  // persist the token in the Ionic Platform
    });
  });
})