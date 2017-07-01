angular.module('SiAR.services', [])
// angular.module('SiAR.services', ['ngCordova'])


.factory ("pontoEletronicoAPI",function($http,$filter){

        var _postComPontoEntrada = function(ponto_eletronico){
            return $http.post("http://localhost/SiARBack/ponto_eletronico/?idt_ponto_eletronico=1&cod_funcionario="
                + ponto_eletronico.cod_funcionario + "&ponto_hr_entrada="
                + ponto_eletronico.ponto_hr_entrada + "&ponto_hr_saida=" + ponto_eletronico.ponto_hr_saida)
        };


    diaBatido = $filter('date')(new Date(), 'yyyy-MM-dd');

        var _getPontoEntradaDoDia = function (cpf_funcionario) {
              return $http.get("http://localhost/SiARBack/ponto_eletronico/?cod_funcionario=" + cpf_funcionario
                  + "&ponto_hr_entrada=" + diaBatido);
        };

        var _getPontoSaidaDoDia = function (cpf_funcionario) {
            return $http.get("http://localhost/SiARBack/ponto_eletronico/?cod_funcionario=" + cpf_funcionario
                + "&ponto_hr_saida=" + diaBatido);
        };

        var _putComPontoSaida = function(ponto_eletronico){
            return $http.put("http://localhost/SiARBack/ponto_eletronico/?cod_funcionario="
                + ponto_eletronico.cod_funcionario + "&ponto_hr_saida="
                + ponto_eletronico.ponto_hr_saida)
        };

        return {
            getPontoEntradaDoDia: _getPontoEntradaDoDia,
            getPontoSaidaDoDia: _getPontoSaidaDoDia,
            postComPontoEntrada: _postComPontoEntrada,
            putComPontoSaida: _putComPontoSaida
        };
    })

.factory ("funcionarioAPI",function($http){

    var _getFuncionarios = function () {
        return $http.get("http://localhost/SiARBack/funcionario/?");
    };

        var _ponto = function(ponto_eletronico){
            return $http.get("http://localhost/SiARBack/funcionario/?cpf_funcionario=" + ponto_eletronico.cpf_funcionario +
                "&pwd_funcionario=" + ponto_eletronico.pwd_funcionario);
        };
        return {
            getFuncionarios: _getFuncionarios,
            ponto: _ponto
        };
})

.factory ("cardapioAPI",function($http){

        var _getItensDoCardapio = function () {
            return $http.get("http://localhost/SiARBack/cardapio/?");
        }
        return {
            getItensDoCardapio: _getItensDoCardapio
        };
    })

.factory ("avaliacaoAPI",function($http){

    var _getGarcons = function () {
        return $http.get("http://localhost/SiARBack/funcionario/?cod_funcao=4");
    }
    
    var _postAvaliacao = function (avaliacao) {
        return $http.post("http://localhost/SiARBack/avaliacao/?cod_funcionario=" + avaliacao.cod_funcionario +
                            "&nta_avaliacao=" + avaliacao.nta_avaliacao + "&txt_cliente=" + avaliacao.txt_cliente);
    }
    return {
        getGarcons: _getGarcons,
        postAvaliacao: _postAvaliacao
    };
})
