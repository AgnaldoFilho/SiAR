angular.module("SiAR").controller("CadastrarCardapioCtrl", function ($scope, $http, cardapioAPI, $location)
{
    $scope.cardapio = {};

    $scope.adicionarItemNoCardapio = function(cardapio){
        $scope.adicionarMenu;
        cardapioAPI.postItemNoCardapio(cardapio).success(function(data){
            delete $scope.cardapio;
            alert("Item Cadastrado no Cardápio com Sucesso!");
            $location.path("/principal");
            $scope.cardapioForm.$setPristine();
        });
    };

    cardapioAPI.getCategorias().success(function (data) {
        $scope.categoria = data;
    })

});