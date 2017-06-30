angular.module("SiAR").controller("CadastrarTurnoFuncionarioCtrl", function ($scope, $http, funcionarioAPI, funcionarioTurno, diaFunc, turnoFunc, funcionario, $location, $window)
{
    $scope.funcionarioTurno = funcionarioTurno.data;
    $scope.funcionario = funcionario.data;
    $scope.diaFunc = diaFunc.data;
    $scope.turnoFunc = turnoFunc.data;


    funcionarioAPI.getDias().success(function (data) {
        $scope.dias = data;
    });
    funcionarioAPI.getTurnos().success(function (data) {
        $scope.turno = data;
    });
    funcionarioAPI.getFuncionario().success(function (data) {
        $scope.funcionarios = data;
    });


    // var ToObject = function (turnos_funcionario) {
    //     return {
    //         cpf_funcionario: funcionario[0].cpf_funcionario,
    //     };
    // };

    // $scope.carregarTurnosFuncionario = function (cod_funcionario) {
    //   funcionarioAPI.getTurnosFuncionario(cod_funcionario).success( function (data) {
    //       $location.path("/CadastrarTurnosFuncionario/:cod_funcionario");
    //       $scope.cadastroTurnosFuncionario = data;
    //     }
    // )};

    $scope.AdicionarTurno = function (turnos_funcionario) {
        $scope.adicionar;
        funcionarioAPI.postTurnosFuncionario(turnos_funcionario).success(function (data) {
            $scope.turnos_funcionario = data;
            $scope.funcionarioTurno.push(funcionarioTurno);
            $window.location.reload();
        });
    };


    $scope.deleteTurno = function (turnos_funcionario) {
         $scope.deletar;
         funcionarioAPI.deleteFuncTurn(turnos_funcionario).success(function (data) {
             $location.path("/listFuncionarios");
             alert("Turno excluido com sucesso!");
        });
    };

});
