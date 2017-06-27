angular.module("SiAR").controller("atualizarCardapioCtrl", function ($scope, $http, cardapio, cardapioAPI, $location)
{
    $scope.cardapio = cardapio.data;

    cardapioAPI.getCategorias().success(function (data) {
        $scope.categoria = data;
    });

    cardapioAPI.getRestaurante().success(function (data) {
        $scope.restauranteCard = data;
    });

    var ToObject = function (cardapio) {
        return {
            idt_cardapio: cardapio[0].idt_cardapio,
            itm_cardapio: cardapio[0].itm_cardapio,
            cod_categoria: cardapio[0].cod_categoria,
            cod_restaurante: cardapio[0].cod_restaurante,
            vlr_itm_cardapio: cardapio[0].vlr_itm_cardapio,
            img_cardapio: cardapio[0].img_cardapio,
            dsc_itm_cardapio: cardapio[0].dsc_itm_cardapio

        };
    };


    $scope.DeletarCardapio = function (cardapio) {
        $scope.deletarMenu;
        cardapioAPI.deleteItemCardapio(cardapio).success(function (data) {
           //console.log(cardapio);
           alert("Item excluído com sucesso!");
            $location.path("/cardapio");
        });
    };
  
    $scope.updateCardapio = function(cardapio){
        $scope.adicionarMenu;
        cardapioAPI.putItemNoCardapio(cardapio).success(function(data){
            delete $scope.cardapio;
            alert("Item Alterado com Sucesso!");
            $location.path("/cardapio");
            $scope.cardapioForm.$setPristine();
        }).error(function (data) {
            swal('Oopa!', 'Desculpe, mas não conseguimos atualzar a Task!', 'error')
        });
    };
    $scope.cardapio = ToObject(cardapio.data);
});