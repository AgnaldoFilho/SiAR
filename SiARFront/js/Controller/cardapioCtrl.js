angular.module("SiAR").controller("cardapioCtrl", function ($scope, $http, cardapio, cardapioAPI, $location)
{
    $scope.cardapio = cardapio.data;

    // var carregarCardapio = function() {
    //
    //     cardapioAPI.getItensDoCardapio().success(function (data) {
    //         $scope.cardapio = data;
    //     });
    // };

  //  carregarCardapio();

    $scope.inserirItem = function(cardapio){
        $scope.adicionarMenu;
        cardapioAPI.postItemNoCardapio(cardapio).success(function(data){
            delete $scope.cardapio;
            alert("Item Cadastrado no Cardápio com Sucesso!");
            $location.path("/principal");
            $scope.cardapioForm.$setPristine();
        });
    };

});