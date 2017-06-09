angular.module("SiAR").controller("pontosBatidosCtrl", function ($scope, $http, ponto_eletronico, pontoEletronicoAPI, $location)
{
    $scope.ponto_eletronico = ponto_eletronico.data;
    // $scope.carregarPontosBatidos = function() {
    //    pontoEletronicoAPI.getPontosBatidos().success(function (data) {
    //             $scope.ponto_eletronico = data;
    //
    //     });
    // };

    $scope.inserirItem = function(ponto_eletronico){
        $scope.adicionarPonto;
        pontoEletronicoAPI.postPontoManual(ponto_eletronico).success(function(data){
            delete $scope.cardapio;
            alert("Item Cadastrado no Cardápio com Sucesso!");
            $location.path("/principal");
            $scope.cardapioForm.$setPristine();
        });
    };

});