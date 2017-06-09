angular.module("SiAR").controller("TurnosFuncionarioCtrl", function ($scope, $http, $routeParams, turnos_funcionario)
{
    $scope.turnos_funcionario = turnos_funcionario.data;


       funcionarioAPI.getTurnos().success(function (data) {
            $scope.turno = data;
        });

});