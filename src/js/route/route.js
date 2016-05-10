angular.module('todoApp')
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states

  var login = {
    name: 'login',
        url: '/login',
        templateUrl: 'src/view/login.html',


  };

  var home = {

    name: 'home',
        url: '/home',
        abstract: true,
        templateUrl: 'src/view/home.html',


  };

  var enroll = {

    name: 'home.enroll',
            parent:home,
            url: '/home.enroll',
            templateUrl: 'src/view/home.enroll.html',
            activetab: 'home.enroll'


  };

  var information = {
    name: 'home.information',
            parent:home,
            url: '/home.information',
            templateUrl: 'src/view/home.information.html',
            activetab: 'home.information'




  };



  $stateProvider
            .state(login)
            .state(home)
            .state(enroll)
            .state(information);

  // $stateProvider
  //   .state('login', {
  //     url: "/login",
  //     templateUrl: "src/view/login.html"
  //
  //   })
  //   .state('home', {
  //     url: "/home",
  //     templateUrl: "src/view/home.html"
  //   })
  //   .state('home/enroll', {
  //     url: "/home/enroll",
  //     parents:"home"
  //     templateUrl: "src/view/enroll.html"
  //   })

});
