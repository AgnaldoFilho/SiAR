angular.module("SiAR").factory("principalAPI", function($http, config){
	var _getFuncionariosDoDia = function () {
		return $http.get(config.baseUrl + "/funcionario/?");
    };
    var _getFuncionario = function (cpf_funcionario) {
      return $http.get(config.baseUrl + "/funcionario/?" + cpf_funcionario);
  };
  return{
      getFuncionariosDoDia: _getFuncionariosDoDia,
      getFuncionario: _getFuncionario
};
});