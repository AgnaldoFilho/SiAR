angular.module("SiAR").factory("listFuncionariosAPI", function($http, config){

	var _getFuncionarios = function () {
		return $http.get(config.baseUrl + "/funcionario/?");
    };
	var _getFuncoes = function () {
        return $http.get(config.baseUrl + "/funcao/?");
    };
    var _getFuncionario = function (cpf_funcionario) {
      return $http.get(config.baseUrl + "/funcionario/?cpf_funcionario=" + cpf_funcionario);
  };
    var _login = function(funcionario){
        return $http.get(config.baseUrl + "/funcionario/?cpf_funcionario=" + funcionario.cpf_funcionario +
            "&pwd_funcionario=" + funcionario.pwd_funcionario);
    };
  return{
      getFuncionarios: _getFuncionarios,
      getFuncoes: _getFuncoes,
      getFuncionario: _getFuncionario,
      login: _login
    };
});