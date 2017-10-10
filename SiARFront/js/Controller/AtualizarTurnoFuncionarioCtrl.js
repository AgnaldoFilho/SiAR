angular.module("SiAR").controller("AtualizarTurnoFuncionarioCtrl", function ($scope, $http, turnos_funcionario, funcionarioAPI, $location)
{

    $scope.turnos_funcionario = turnos_funcionario.data;

    var ToObject = function (turnos_funcionario) {
        return {
            idt_turnos_funcionario: turnos_funcionario[0].idt_turnos_funcionario,
            cod_funcionario: turnos_funcionario[0].cod_funcionario,
            cod_dia: turnos_funcionario[0].cod_dia,
            cod_turno: turnos_funcionario[0].cod_turno
        };
    }

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

    $scope.AtualizarTurno = function (turnos_funcionario) {
        $scope.atualizarTurno;
        funcionarioAPI.putTurnosFuncionario(turnos_funcionario).success(function (data) {
            //$scope.turnos_funcionario = data;
            $location.path("/listFuncionarios")
        });
    };

    $scope.DeletarTurno = function (turnos_funcionario) {
         $scope.deletarTurno;
         funcionarioAPI.deleteFuncTurn(turnos_funcionario).success(function (data) {
             alert("Turno excluido com sucesso!");
             $location.path("/listFuncionarios");
        });
    };
    $scope.turnos_funcionario = ToObject(turnos_funcionario.data);
});
