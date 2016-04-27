angular.module('app.controllers', [])
 
.controller('cameraTabDefaultPageCtrl', function($scope) {


})
   
.controller('cartTabDefaultPageCtrl', function($scope) {
  $scope.DataNews=[];
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM News', [], function (tx, results) {
       var len = results.rows.length, i;
       msg = "<p>Создано строк: " + len + "</p>";
       document.querySelector('#status').innerHTML +=  msg;
       for (i = 0; i < len; i++){
          $scope.DataNews[i]=results.rows.item(i);
       }
    }, null);
  });
})
   
.controller('cloudTabDefaultPageCtrl', function($scope) {

})

.controller('PhoneListCtrl', function ($scope, $http, $ionicHistory, $state) {
  $scope.AddNews=[];
  $scope.DataNews=[];

  var db = openDatabase('mydb', '1.0', 'Test DB',  32* 1024 * 1024);
  var msg;
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS News (id PRIMARY KEY, name, text)');
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
        tx.executeSql('INSERT INTO News (id, name, text) VALUES ("'+value.id+'", "'+value.name+'", "'+value.text+'")');
      });
      
    })
    $ionicHistory.clearCache();
    $scope.select();
    
  }

  $scope.doRefresh = function() {
  $http.get('http://vpoezdshop.ru/data.json')
   .success(function(data) {
    $ionicHistory.clearCache();
    $scope.news = data;
    $scope.addNews();
    $scope.select();
    
   })
   .finally(function() {
     // Stop the ion-refresher from spinning
     $scope.$broadcast('scroll.refreshComplete');
   });
  };

    $http.get('http://vpoezdshop.ru/data.json')
       .success(function(data) {
        $scope.news = data;
        $scope.addNews();
       }).error(function() {
        $scope.select();
        alert('no internet conection');})

        
         
       



})