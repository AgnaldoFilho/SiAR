angular.module("SiAR").factory ("pontoEletronicoAPI",function($http, config){

    var _postPontoManual = function(ponto_eletronico){
        return $http.post(config.baseUrl + "/ponto_eletronico/?idt_ponto_eletronico=1&cod_funcionario="
                        + ponto_eletronico.cod_funcionario + "&ponto_hr_entrada="
                        + ponto_eletronico.ponto_hr_entrada + "&ponto_hr_saida="
                        + ponto_eletronico.ponto_hr_saida)
    };

    var _getPontosBatidos = function () {
        return $http.get(config.baseUrl + "/ponto_eletronico/?");
    };

    return {
        postPontoManual: _postPontoManual,
        getPontosBatidos: _getPontosBatidos
    };
});