angular.module("SiAR").controller("principalCtrl", function($scope, $filter, $http, config, principalAPI)
{
		// var carregarFuncionariosDoDia = function() {
		// 	$http.get(config.baseUrl + "/funcionario/?").success(function (data) {
		// 		$scope.funcionario = data;
		// 	});
		// };

    $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');

	principalAPI.getFuncionariosDoDia($scope.today).success(function (data) {
		$scope.principal = data;
	});

    // $scope.dateEntrada = $filter('date')(new Date().setDate(new Date().principalAPI.getFuncionariosDoDia()), 'yyyy-MM-dd');

    // carregarFuncionariosDoDia();
	});