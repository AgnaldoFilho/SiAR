angular.module("SiAR").controller("atualizarFuncionarioCtrl", function ($scope, $http, funcionario, funcionarioAPI, $location)
{
    // var formatDate = function (date) {
    //     var day = date.getDate();
    //     var month = date.getMonth();
    //     var year = date.getFullYear();
    //     return year + "-" + month + "-" + day;
    // };
    funcionarioAPI.getEstadoCivil().success(function (data) {
        $scope.estadocivil = data;
    });

    var ToObject = function (funcionario) {
        return {
            img_funcionario: funcionario[0].img_funcionario,
            nme_funcionario: funcionario[0].nme_funcionario,
            end_funcionario: funcionario[0].end_funcionario,
            cpf_funcionario: funcionario[0].cpf_funcionario,
            rg_funcionario: funcionario[0].rg_funcionario,
            end_estado_funcionario: funcionario[0].end_estado_funcionario,
            end_cidade_funcionario: funcionario[0].end_cidade_funcionario,
       //     dta_nasc_funcionario: new Date(funcionario[0].dta_nasc_funcionario),
            dta_nasc_funcionario: funcionario[0].dta_nasc_funcionario,
            cel_funcionario: funcionario[0].cel_funcionario,
            end_bairro_funcionario: funcionario[0].end_bairro_funcionario,
            end_nr_funcionario: funcionario[0].end_nr_funcionario,
            tel_funcionario: funcionario[0].tel_funcionario,
            sex_funcionario: funcionario[0].sex_funcionario,
            cep_funcionario: funcionario[0].cep_funcionario,
            cod_estado_civil: funcionario[0].cod_estado_civil,
            pwd_funcionario: funcionario[0].pwd_funcionario,
            cod_funcao: funcionario[0].cod_funcao,
            cod_restaurante: funcionario[0].cod_restaurante
        };
    };

    $scope.updateFuncionario = function(funcionario){
        $scope.adicionarF;
       // funcionario.dta_nasc_funcionario = formatDate(funcionario.dta_nasc_funcionario);
        funcionarioAPI.putFuncionario(funcionario).success(function(data){
            delete $scope.funcionario;
            alert("Funcionário Alterado com Sucesso!");
            $location.path("/principal");
            $scope.funcionarioForm.$setPristine();
        }).error(function (data) {
            swal('Oopa!', 'Desculpe, mas não conseguimos atualzar a Task!', 'error')
        });
    };
    $scope.funcionario = ToObject(funcionario.data);
});