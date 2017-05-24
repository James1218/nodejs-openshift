var app = angular.module("DeveloperApp",[]);

app.controller("DeveloperController", 
function($scope, $http){
    $scope.hello = "Hello from Angular";

    $http.get("/developer")
    .then(function(success){
        $scope.developers = success.data;
    }, function(error){
        console.log(error);
    });

    $scope.update = function(newUser){
        $http.put("/developer/" + $scope.selectIndex, newUser)
        .then(function(success, error){
            $scope.developers = success.data;
        },function(error){

        });
    }
    
    $scope.create = function(newUser){
        $http.post("/developer", newUser)
        .then(function(success, error){
            $scope.developers = success.data;
        }, function(error){

        });
    };

    $scope.selectIndex = null;
    $scope.select = function(index){
        $scope.newUser = $scope.developers[index];
        $scope.selectIndex = index;  
    }

    $scope.remove = function(index){
        $http.delete("/developer/"+index)
        .then(function(success){
            $scope.developers = success.data;
        }, function(error){

        })
    }

});