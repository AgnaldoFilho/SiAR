angular.module("SiAR").controller("listFuncionariosCtrl", function ($scope, $http, listFuncionariosAPI)
{

    var carregarListFuncionarios = function() {
        listFuncionariosAPI.getFuncionarios().success(function (data) {
            $scope.listFuncionarios = data;
        });
    };
    // var carregarListFuncionariosPorFuncao = function() {
    //     listFuncionariosAPI.getFuncoes().success(function (data) {
    //         $scope.listFuncionariosPorFuncao = data;
    //     });
    // };

    // $scope.deleteFuncionarios = function (cpf_funcionario) {
    //     funcionarioAPI.deleteCadastro(cpf_funcionario).success(function (data) {
    //         alert("Funcionário excluído com sucesso!");
    //     });
    // };
	carregarListFuncionarios();
   // carregarListFuncionariosPorFuncao();
});