
var app = angular.module('xAdmin',['ng','ngRoute','angular-md5']);
//配置路由词典
app.config(function ($routeProvider) {
  $routeProvider
    .when('/xStart',{
          templateUrl:'tpl/login.html',
          controller:'loginCtrl'
      })
      .when('/xMain',{
          templateUrl:'tpl/login.html',
          controller:'mainCtrl'
      })
    .when('/xIndex',{
      templateUrl:'tpl/index.html'
    })
      .when('/xConsole',{
          templateUrl:'tpl/console.html'
      })
      .when('/xRule',{
          templateUrl:'tpl/rule.html',
          controller:'RuleCtrl'
      })
      .when('/xRM',{
          templateUrl:'tpl/rule_m.html'
      })
      .when('/xJob',{
          templateUrl:'tpl/jobflow.html'
      })
      .when('/xBlack',{
          templateUrl:'tpl/blacklist.html'
      })
      .when('/xSys',{
          templateUrl:'tpl/system.html'
      })
      .when('/xHelp',{
          templateUrl:'tpl/help.html'
      })
      .when('/*',{
        templateUrl:'tpl/login.html'
      })
  .otherwise({redirectTo:'/xStart'})
});
//创建控制器，封装了跳转的方法
app.controller('parentCtrl', ['$scope','$location', function ($scope,$location) {
      $scope.user= localStorage.user_name;
      $scope.jump = function (desPath) {
        $location.path(desPath);
      };
    }
  ]);

app.controller('loginCtrl',['$scope','$http','$location','md5','$window',function($scope,$http,$location,md5,$rootScope){
    $scope.username="";
    $scope.password="";
    $scope.$watch('password' ,function() {
        $scope.pwd = md5.createHash($scope.password || '');
    });
    $scope.login=function(){
            $http
                    .get('http://101.201.253.36:8087/sys/login?username='+ $scope.username+'&password='+  $scope.pwd)
                    .success(function(data){
                    console.log( $scope.username);
                    console.log($scope.pwd);
                        console.log(data.code);
                            if(data.code==2000){
                                localStorage.user_name = $scope.username;
                                //登录成功后跳转到首页
                                $location.path('/xIndex');
                            }else{
                                alert('用户名/密码错误，请重新输入！')
                            }
                    })
    }
}]);
app.controller('RuleCtrl',['$scope','$http',function($scope,$http){
    $scope.isActiveRadio='1';
}]);
















