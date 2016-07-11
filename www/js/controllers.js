angular.module('app.controllers', [])
 
.controller('cameraTabDefaultPageCtrl', function($scope) {


})

 .controller('newsCtrl', function($scope, $stateParams, $sce) {
  $scope.var=[];
  $scope.sce = $sce;
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true;
  }); 
  $scope.newsId = $stateParams.newsId;
  var db = openDatabase('mydb', '1.0', 'Test DB',  32* 1024 * 1024);
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM News WHERE id=(?)', [$scope.newsId], function (tx, results) {
      $scope.var=results.rows.item(0);
    }, null);
  })
})  
.controller('cartTabDefaultPageCtrl', function($scope) {
  /*$scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
  };*/

  var db = openDatabase('mydb', '1.0', 'Test DB',  32* 1024 * 1024);
  $scope.DataNews=[];
  
    $scope.select = function() {
      db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM News', [], function (tx, results) {
           var len = results.rows.length, i;
           for (i = 0; i < len; i++){
              $scope.DataNews[i]=results.rows.item(i);
           }
        }, null);
      });
    }
  $scope.$on("$ionicView.beforeEnter", function(event, data){
    $scope.select();
  })
})
   
.controller('cloudTabDefaultPageCtrl', function($scope) {
 var db = openDatabase('mydb', '1.0', 'Test DB',  32* 1024 * 1024);
    db.transaction(function (tx) {
      tx.executeSql('DROP TABLE IF EXISTS News');
      });
})

.controller('PhoneListCtrl', function ($scope, $http, $ionicHistory, $state) {
  $scope.AddNews=[];
  $scope.DataNews=[];



  var db = openDatabase('mydb', '1.0', 'Test DB',  32* 1024 * 1024);
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS News (id PRIMARY KEY, name, text, url)');
  }); 
  $scope.select = function() {
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM News', [], function (tx, results) {
         var len = results.rows.length, i;
         for (i = 0; i < len; i++){
            $scope.DataNews[i]=results.rows.item(i);
         }
      }, null);
    });
  }
  $scope.addNews = function() {
   db.transaction(function (tx) {var j=0;
    angular.forEach( $scope.news,function(value,key){
        tx.executeSql('SELECT * FROM News', [], function (tx, results) {
          var len = results.rows.length, i;var bo=true;
          for (i = 0,bo=true; i < len; i++){
            if(results.rows.item(i).id==value.id) {
              bo=false;
            }
          }
          if(bo||len==0){$scope.AddNews[j]=value;j++;}var bo=true;
        })
      });
    });
    db.transaction(function (tx) {
      angular.forEach( $scope.AddNews,function(value,key){
        //alert('INSERT INTO News (id, name, text) VALUES ('+value.id+', '+value.name+', '+value.text+')');
        tx.executeSql('INSERT INTO News (id, name, text, url) VALUES ("'+value.id+'", "'+value.name+'", "'+value.text+'", "'+value.url+'")');
      });
      
    })
    $ionicHistory.clearCache();
    $scope.select();
    
  }
  $scope.selectFromDb = function() {
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM News', [], function (tx, results) {
         var len = results.rows.length, i;
         for (i = 0; i < len; i++){
            $scope.DataNews[i]=results.rows.item(i);
         }
         $ionicHistory.clearCache();
      }, null);
    });
  }
  $scope.doRefresh = function() {


    
  $http.get('http://www.panda.h1n.ru/data.php')
   .success(function(data) {
    $scope.news = data;
    $scope.addNews();
    $ionicHistory.clearCache();
    $scope.DataNews = data;
   })
   .error(function() {
        $scope.select();
        alert('no internet conection');})
   .finally(function() {
     // Stop the ion-refresher from spinning
     $scope.$broadcast('scroll.refreshComplete');
   });
  };



    $http.get('http://www.panda.h1n.ru/data.php')
    .success(function(data) {
      $scope.news = data;
      //$scope.DataNews = data;
      $scope.addNews();
      $scope.$on("$ionicView.beforeEnter", function(event, data){
        $scope.select();
      })
      //$scope.select();  
    })
    .error(function(response) {
      $scope.selectFromDb();
      alert('no internet conection'+response);
    })

})
