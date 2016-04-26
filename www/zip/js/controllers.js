angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
 

          var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
           var msg;

           db.transaction(function (tx) {
              tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
              tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
              tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")');
              tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "news")');
              msg = '<p>Log message created and row inserted.</p>';
              document.querySelector('#status').innerHTML =  msg;
           });

           db.transaction(function (tx) {
              tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
                 var len = results.rows.length, i;
                 msg = "<p>Found rows: " + len + "</p>";
                 document.querySelector('#status').innerHTML +=  msg;
            
                 for (i = 0; i < len; i++){
                    msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
                    document.querySelector('#status').innerHTML +=  msg;
                 }
              }, null);
           });

 /*$http.get('http://vpoezdshop.ru/data.json')
         .success(function(data) {
           $scope.di = data;
         })
         $scope.orderProp = 'name';*/
  $scope.name='world';})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
