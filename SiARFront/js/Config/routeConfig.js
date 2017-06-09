angular.module("SiAR").config(function($routeProvider){
	$routeProvider.when("/login",{
		templateUrl: "view/login.html",
		controller: "loginCtrl"
	});
    $routeProvider.when("/principal",{
        templateUrl: "view/principal.html",
        controller: "principalCtrl"
    });

	$routeProvider.when("/listFuncionarios",{
		templateUrl: "view/listFuncionarios.html",
		controller: "listFuncionariosCtrl",
        resolve: {
            funcionarios: function (listFuncionariosAPI) {
                return listFuncionariosAPI.getFuncionarios();
            }
        }
	});
	$routeProvider.when("/pontosBatidos",{
        templateUrl: "view/pontosBatidos.html",
        controller: "pontoEletronicoCtrl",
        resolve: {
            ponto_eletronico: function (pontoEletronicoAPI) {
                return pontoEletronicoAPI.getPontosBatidos();
            }
        }
    });

    $routeProvider.when("/funcionario/:cpf_funcionario",{
        templateUrl: "view/funcionario.html",
        controller: "funcionarioCtrl",
        resolve: {
            funcionario: function (listFuncionariosAPI, $route) {
                return listFuncionariosAPI.getFuncionario($route.current.params.cpf_funcionario);
            },
        }
    });

    $routeProvider.when("/CadastrarFuncionario",{
        templateUrl: "view/CadastrarFuncionario.html",
        controller: "CadastrarFuncionarioCtrl"
    });

    $routeProvider.when("/atualizarFuncionario/:cpf_funcionario",{
        templateUrl: "view/atualizarFuncionario.html",
        controller: "atualizarFuncionarioCtrl",
        resolve:{
            funcionario: function(funcionarioAPI, $route){
                return funcionarioAPI.getFuncionario($route.current.params.cpf_funcionario);
            }
        }

    });

    $routeProvider.when("/CadastrarTurnoFuncionario",{
        templateUrl: "view/CadastrarTurnoFuncionario.html",
        controller: "CadastrarTurnoFuncionarioCtrl",
        // resolve: {
        //     turnos_funcionario: function(funcionarioAPI, $route){
        //         return funcionarioAPI.getTurnosFuncionario($route.current.params.cpf_funcionario);
        //     },
        //     turnos_funcionario: function(funcionarioAPI, $route){
        //         return funcionarioAPI.getTurnos($route.current.params.idt_turno);
        //     }
        // }
    });
    $routeProvider.when("/CadastrarTurnoFuncionario/:cod_funcionario", {
        templateUrl: "view/CadastrarTurnoFuncionario.html",
        controller: "CadastrarTurnoFuncionarioCtrl",
        resolve: {
            cadastroTurnosFuncionario: function (funcionarioAPI, $route) {
               return funcionarioAPI.getTurnosFuncionario($route.current.params.cod_funcionario);
            }
        }
    });

    $routeProvider.when("/funcionario/:cod_funcao",{
        templateUrl: "view/funcionario.html",
        controller: "funcionarioCtrl",
        resolve: {
            funcao: function (listFuncionariosAPI) {
                return listFuncionariosAPI.getFuncoes();
            },
        }

    });

    $routeProvider.when("/CadastrarCardapio",{
        templateUrl: "view/CadastrarCardapio.html",
        controller: "CadastrarCardapioCtrl"
    });

    $routeProvider.when("/atualizarCardapio/:idt_cardapio",{
        templateUrl: "view/atualizarCardapio.html",
        controller: "atualizarCardapioCtrl",
        resolve:{
            cardapio: function(cardapioAPI, $route){
                return cardapioAPI.getItemDoCardapio($route.current.params.idt_cardapio);
            }
        }

    });

    $routeProvider.when("/cardapio",{
        templateUrl: "view/cardapio.html",
        controller: "cardapioCtrl",
        resolve: {
            cardapio: function (cardapioAPI) {
                return cardapioAPI.getItensDoCardapio();
            },
        }

    });

    $routeProvider.otherwise({redirectTo:"/login"})
});