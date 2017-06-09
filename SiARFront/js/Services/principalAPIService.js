angular.module("SiAR").factory("principalAPI", function($http, config){

  var _getFuncionariosDoDia = function (today) {
		return $http.get(config.baseUrl + "/ponto_eletronico/?ponto_hr_entrada=" + today);
    };

    var _getFuncionario = function (cpf_funcionario) {
      return $http.get(config.baseUrl + "/funcionario/?" + cpf_funcionario);
    };

      return{
              getFuncionariosDoDia: _getFuncionariosDoDia,
              getFuncionario: _getFuncionario
            };
});