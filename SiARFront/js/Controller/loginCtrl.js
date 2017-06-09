angular.module("SiAR").controller("loginCtrl", function ($scope, $http, funcionarioAPI, $location)
{
    $scope.Logar = function(funcionario){
        funcionarioAPI.login(funcionario).success(function (data) {
            if (data.length == 1) {
                $location.path("/principal");
                // if (data.cod_funcao == 1)
                //     $location.path("/principal");
                // else{
                //     alert("Usuário não autorizado!")
                // }
            }else{
                alert("Usuário não autorizado / Login ou Senha incorretos!");
                $scope.loginForm.$setPristine();
            }
        })
    }
});