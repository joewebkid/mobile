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

.controller('PhoneListCtrl', function ($scope, $http) {
    $scope.AddNews=[];
    $scope.news=[];
    $scope.DataNews=[];

    $http.get('http://vpoezdshop.ru/data.json')
       .success(function(data) {
         $scope.news = data;

       }).error(function() {
         alert('NO');})

        var db = openDatabase('mydb', '1.0', 'Test DB',  32* 1024 * 1024);
         var msg;
         db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS News (id PRIMARY KEY, name, text)');

            msg = '<p>База данных "News" создана.</p>';
            document.querySelector('#status').innerHTML =  msg;
         });
         db.transaction(function (tx) {var j=0;
            $scope.news.forEach( function(value) {var bo=true;
              tx.executeSql('SELECT * FROM News', [], function (tx, results) {
                var len = results.rows.length, i;
                for (i = 0; i < len; i++){
                  if(results.rows.item(i).name==value.name) {
                    bo=false;alert(results.rows.item(i).name);
                    db.transaction(function (tx) {
                    tx.executeSql('UPDATE News SET(id, name, text) VALUES ("'+value.id+'", "'+value.name+'", "'+value.text+'")');});
                  }
                }if(bo||len==0){$scope.AddNews[j]=value;j++;}
              })
            });
          });
         
        db.transaction(function (tx) {
          $scope.AddNews.forEach( function(value) {
            //alert('INSERT INTO News (id, name, text) VALUES ('+value.id+', '+value.name+', '+value.text+')');
            tx.executeSql('INSERT INTO News (id, name, text) VALUES ("'+value.id+'", "'+value.name+'", "'+value.text+'")');
          })
        })


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
        /* 
var msg2;*/
})