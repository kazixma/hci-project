angular.module('todoApp', ['ui.router','ngCookies','ngStorage'])
.controller('TodoListController', function ($state,$scope,ApiCourse,$cookies,$localStorage,$location) {
  $scope.user={};
  $scope.user.username = '';
  $scope.usingcookie = $cookies.get('username');



  $localStorage[$cookies.get("username")]  = $localStorage[$cookies.get("username")] || {};

  if($localStorage[$cookies.get("username")].enroll == undefined){
    $localStorage[$cookies.get("username")].enroll = [];
    $scope.courseenroll = $localStorage[$cookies.get("username")].enroll;

  }else{
    $localStorage[$cookies.get("username")].enroll = $localStorage[$cookies.get("username")].enroll;
    $scope.courseenroll = $localStorage[$cookies.get("username")].enroll;
  }
  $localStorage[$cookies.get("username")].credit = $localStorage[$cookies.get("username")].credit|| 0;

  console.log($scope.usingcookie);
  if($scope.usingcookie != '' && $scope.usingcookie != undefined ){
    //  $state.go('home.information');
    $scope.courseenroll = $localStorage[$cookies.get("username")].enroll;
    console.log($scope.usingcookie);
    $location.path( "/home/home.information" );
    console.log("h");

  }else{
    $location.path( "/login" );
    console.log("hh");
  }




  $scope.checklogin = function() {
    if($scope.usingcookie != ''){
      //  $state.go('home.information');
      $location.path( "/home/home.information" );

    }else{
      $location.path( "/login" );
    }

  }

  $scope.login = function(){
    if($scope.user.username!=''){
      $cookies.remove('username');
      $cookies.put('username',$scope.user.username);
      $scope.usingcookie = $cookies.get('username');
      console.log($scope.user.username);
      $localStorage[$cookies.get("username")]  = $localStorage[$cookies.get("username")] || {};
    if($localStorage[$cookies.get("username")].enroll == undefined){
      $localStorage[$cookies.get("username")].enroll = [];
      $scope.courseenroll = $localStorage[$cookies.get("username")].enroll;

    }else{
      $localStorage[$cookies.get("username")].enroll = $localStorage[$cookies.get("username")].enroll;
      $scope.courseenroll = $localStorage[$cookies.get("username")].enroll;
    }
    $localStorage[$cookies.get("username")].credit = $localStorage[$cookies.get("username")].credit|| 0;
      $scope.credit =   $localStorage[$cookies.get("username")].credit;
      $state.go('home.information');





    }

  }

  $scope.logout = function(){

    $cookies.remove('username');
    $scope.usingcookie = '';
    console.log($cookies.get('username'));
    $state.go('login');




  }
  $scope.isActive = function(item) {
       return $scope.title === item;
};
  $scope.enroll = function(){
    $('#information').removeClass('active');
    $('#enroll').addClass('active');
    $state.go('home.enroll');

  }
  $scope.information = function(){
    $('#enroll').removeClass('active');
    $('#information').addClass('active');
    $state.go('home.information');

  }

  $scope.keys = Object.keys(course);
  $scope.courses= course;
  $scope.isshowdialog =false;
  $scope.coursename = "";
  $scope.courseid = "";

  $scope.credit = $localStorage[$cookies.get("username")].credit;
  $scope.currentcredit = 0;

  $scope.dialog = function(id){
    var api = new ApiCourse();
    $scope.courseid = id;
    $scope.currentcredit = $scope.courses[id].credit.total;
    $scope.coursename = $scope.courses[id].name.en;
    api.getInfo(id).then(function(data){
      $scope.datainfo = data.data;
      $scope.isshowdialog = true;

      console.log($scope.isshowdialog);


    },function(err){
      console.log("fail");
      $scope.datainfo = null;
      $scope.isshowdialog = true;


    });

  }
  $scope.closedialog = function(){

    $scope.isshowdialog =false;
    $scope.showmessagemore = false;
    $scope.showmessagesame = false;
    console.log($scope.isshowdialog);


  }

  $scope.jsonexport = JSON.stringify($scope.courseenroll);
  console.log($localStorage[$cookies.get("username")].enroll);
  $scope.enrollcourse = function(name,sec){
    var data = {
      courseid:$scope.courseid,
      coursename:name,
      section:sec


    };
    var tmp = $scope.credit +$scope.currentcredit;
    if(tmp<=23){
      if(!containsObject(data,$scope.courseenroll)){
        $scope.courseenroll.push(data);
        $scope.credit += $scope.currentcredit;
        //console.log($scope.user.username);

        $localStorage[$cookies.get("username")].enroll= $scope.courseenroll;
        $localStorage[$cookies.get("username")].credit = $scope.credit;
        $scope.jsonexport = JSON.stringify($scope.courseenroll);
        $scope.showmessagesame = false;
      }else{
        alert("You have to enroll for this course.");
        $scope.showmessagesame = true;

      }
    }else{
       console.log("more than 23");

      if(!containsObject(data,$scope.courseenroll)){
        $scope.showmessagemore = true;
        $scope.showmessagesame = false;
        alert("You have to enroll for this course.");



      }else{
        $scope.showmessagemore = false;
          $scope.showmessagesame = true;
          alert("Unable to register The maximum credit.");


      }

    }

    console.log($scope.courseenroll);


  }

  $scope.dropcourse = function(array , index ,courseid){
    array.splice(index, 1);
    $scope.credit -= $scope.courses[courseid].credit.total;
    $localStorage[$cookies.get("username")].enroll = $scope.courseenroll;
    $localStorage[$cookies.get("username")].credit = $scope.credit;
    $scope.jsonexport = JSON.stringify($scope.courseenroll);

  }

  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].courseid === obj.courseid) {
        return true;
      }
    }

    return false;
  }

  function isLogin(){


  }
  //  console.log(course);
})
