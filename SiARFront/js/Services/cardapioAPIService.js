angular.module("SiAR").factory ("cardapioAPI",function($http, config){

    var _postItemNoCardapio = function(cardapio){
        return $http.post(config.baseUrl + "/cardapio/?idt_cardapio=1&itm_cardapio="
            + cardapio.itm_cardapio + "&cod_categoria=" + cardapio.cod_categoria + "&cod_restaurante=1&vlr_itm_cardapio="
            + cardapio.vlr_itm_cardapio + "&img_cardapio=" + cardapio.img_cardapio + "&dsc_itm_cardapio=" + cardapio.dsc_itm_cardapio)
    };

    var _putItemNoCardapio = function(cardapio){
        return $http.put(config.baseUrl + "/cardapio/?idt_cardapio=" + cardapio.idt_cardapio + "&itm_cardapio="
            + cardapio.itm_cardapio + "&cod_categoria=" + cardapio.cod_categoria + "&cod_restaurante=1&vlr_itm_cardapio="
            + cardapio.vlr_itm_cardapio + "&img_cardapio=" + cardapio.img_cardapio + "&dsc_itm_cardapio=" + cardapio.dsc_itm_cardapio)
    };

    var _getItensDoCardapio = function () {
        return $http.get(config.baseUrl + "/cardapio/?");

    };

    var _getItemDoCardapio = function (idt_cardapio) {
        return $http.get(config.baseUrl + "/cardapio/?idt_cardapio=" + idt_cardapio);
    };

    var _getCategorias = function () {
        return $http.get(config.baseUrl + "/categoria/?");
    };

    var _getRestaurante = function () {
        return $http.get(config.baseUrl + "/restaurante/?");
    };

    var _deleteItemCardapio = function (idt_cardapio) {
        return $http.delete(config.baseUrl + "/cardapio/?idt_cardapio=" + idt_cardapio.idt_cardapio);
    };


    return {
        postItemNoCardapio: _postItemNoCardapio,
        putItemNoCardapio: _putItemNoCardapio,
        getItensDoCardapio: _getItensDoCardapio,
        getItemDoCardapio: _getItemDoCardapio,
        deleteItemCardapio: _deleteItemCardapio,
        getRestaurante: _getRestaurante,
        getCategorias: _getCategorias
    };
});