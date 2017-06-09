angular.module("SiAR").controller("principalCtrl", function($scope, $http, config)
{
		var carregarFuncionariosDoDia = function() {
			$http.get(config.baseUrl + "/funcionario/?").success(function (data) {
				$scope.funcionario = data;
			});
		};
    carregarFuncionariosDoDia();
	});