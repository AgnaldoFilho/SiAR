angular.module("SiAR").controller("CadastrarTurnoFuncionarioCtrl", function ($scope, $http, funcionarioAPI, $location)
{

    funcionarioAPI.getDias().success(function (data) {
        $scope.dias = data;
    });

    funcionarioAPI.getTurnos().success(function (data) {
        $scope.turno = data;
    });

    funcionarioAPI.getFuncionarios().success(function (data) {
        $scope.funcionario = data;
    });

    $scope.carregarTurnosFuncionario = function (cod_funcionario) {
      funcionarioAPI.getTurnosFuncionario(cod_funcionario).success( function (data) {
          $location.path("/CadastrarTurnosFuncionario/:cod_funcionario");
          $scope.cadastroTurnosFuncionario = data;
        }
    )};

    $scope.AdicionarTurno = function (turnos_funcionario) {
        $scope.adicionar;
        funcionarioAPI.postTurnosFuncionario(turnos_funcionario).success(function (data) {
            $scope.turnos_funcionario = data;
            $scope.turnos_funcionario.push({nme_funcionario: $scope.nme_funcionario, dsc_dia: $scope.dsc_dia, dsc_turno: $scope.dsc_turno});
        });
    };

    // $scope.adicionarFuncionario = function(funcionario){
    //     $scope.adicionarF;
    //     // funcionario.dta_nasc_funcionario = formatDate(funcionario.dta_nasc_funcionario);
    //     funcionarioAPI.postFuncionario(funcionario).success(function(data){
    //         delete $scope.funcionario;
    //         alert("Funcionário Cadastrado com Sucesso!");
    //         $location.path("/principal");
    //         $scope.funcionarioForm.$setPristine();
    //     });
    // };

    // $scope.checkAll = function (dia) {
    //
    //     $scope.allTurnos = true;
    //
    //     for (var i = 0; i < $scope.dias.id.length; i++) {
    //         if($scope.dias[i].id == dia.id){
    //             for (var j = 0; j < $scope.turno[i].turno.length; j++) {
    //                 $scope.turnos_funcionario[i].turnos[j].id.checkbox.value=true;
    //             }
    //         }
    //     }
    //
    // };

    // $scope.adicionarTurnos = function () {
    //     $scope.adicionar;
    //     var TurnoFuncionarioSize = 0;
    //     var dia;
    //
    //     for (var dia in $scope.turnos_funcionario) {
    //         TurnoFuncionarioSize++;
    //     }
    //
    //     for (var i = 0; i < TurnoFuncionarioSize; i++) {
    //
    //         var diaObj = $scope.turnos_funcionario[i].cod_dia;
    //         var funcionarioCPF = $scope.funcionario[0].cpf_funcionario;
    //         var turnoObj = $scope.turnos_funcionario[i].cod_turno
    //         ;
    //
    //         if (diaObj.checkbox.value == true) {
    //             for (var j = 0; j < turnoObj.length; j++) {
    //                 if (turnoObj[j].checkbox.value == true) {
    //                     turnos = {
    //                         cod_funcionario: funcionarioCPF,
    //                         cod_dia: diaObj.id,
    //                         cod_turno: turnoObj[j].id
    //                     }
    //                     funcionarioAPI.postTurnosFuncionario(turnos);
    //                     alert("Turnos adicionados com sucesso");
    //                     $location.path("/principal");
    //                 }
    //             }
    //         }
    //     }
    // };

    // var objectfyDiasComTurnos = function(funcionario){
    //     turnoObj = {};
    //     var DiasArr = [];
    //     var TurnosArr = [];
    //     var j = 1;
    //
    //     diaObj = {};
    //
    //     for (var i = 0; i < funcionario.length; i++) {
    //         DiasArr[funcionario[i].cod_dia-1] = funcionario[i].cod_dia;
    //     }
    //
    //     for (var i = 0; i < funcionario.length; i++) {
    //         while(j == funcionario[i].cod_dia){
    //             turnoObj = {id: funcionario[i].idt_turno, turno: funcionario[i].dsc_turno, checkbox: {value : false}};
    //             turnosArr.push(turnoObj);
    //             i++;
    //
    //             if(i==funcionario.length){
    //                 break;
    //             }
    //         }
    //         i--;
    //         DiasObj[j-1] = {id: funcionario[i].cod_dia ,dia: DiasArr[j-1], checkbox: {value : false}, turnos:TurnosArr };
    //         TurnosArr = [];
    //         j++;
    //     }
    //
    //     $scope.turnos_funcionario = DiasObj;
    // };
    //
    // objectfyDiasComTurnos(turnos_funcionario.data);

});