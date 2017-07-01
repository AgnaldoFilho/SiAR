angular.module('SiAR.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller("BaterPontoCtrl", function ($scope, $filter, $http, $timeout, pontoEletronicoAPI, funcionarioAPI,$ionicPopup)
    {
        //  $scope.funcionario = funcionario.data;

        // var formatDate = function (date) {
        //     var day = date.getDay();
        //     var month = date.getMonth();
        //     var year = date.getFullYear();
        //     var hour = date.getHours();
        //     var minute = date.getMinutes();
        //     return year + "-" + month + "-" + day + " " + hour + ":" + minute;
        // };


        var lat = -15.8178547;
        var long = -47.8367635;
        var minDistance = 10;

        // Credit: http://stackoverflow.com/a/27943/52160
      function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2-lat1);  // deg2rad below
            var dLon = deg2rad(lon2-lon1);
            var a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c; // Distance in km
          var d = Math.round(d).toFixed(2);
            return d;
        }

        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }
        //
        // $scope.BaterPonto = function(ponto_eletronico){
        //     $scope.adicionarP;
        //     ponto_eletronico.ponto_hr_entrada = formatDate(ponto_eletronico.ponto_hr_entrada);
        //     pontoEletronicoAPI.postPontoManual(ponto_eletronico).success(function(data){
        //         delete $scope.ponto_eletronico;
        //         alert("Ponto Eletrônico Cadastrado com Sucesso!");
        //         $location.path("/pontoEletronico");
        //         $scope.pontoManualForm.$setPristine();
        //     });
        // };

        $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
        $scope.diaBatido = $filter('date')(new Date(), 'yyyy-MM-dd');
        $scope.Validar = function(ponto_eletronico) {
                funcionarioAPI.ponto(ponto_eletronico).success(function (data) {
                    if (data.length == 1) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            console.log(lat, long);
                            console.log(position.coords.latitude, position.coords.longitude);
                            var dist = getDistanceFromLatLonInKm(lat, long, position.coords.latitude, position.coords.longitude);
                            console.log("dist in km is " + dist);
                            if(dist <= minDistance){
                                    pontoEletronicoAPI.getPontoEntradaDoDia(ponto_eletronico.cpf_funcionario).success(function (entrada) {
                                        pontoEletronicoAPI.getPontoSaidaDoDia(ponto_eletronico.cpf_funcionario).success(function (saida) {
                                            if (entrada.length == saida.length) {
                                                ponto_eletronico.cod_funcionario = ponto_eletronico.cpf_funcionario;
                                                ponto_eletronico.ponto_hr_entrada = $scope.today;
                                                ponto_eletronico.ponto_hr_saida = '0000-00-00 00:00:00';
                                                pontoEletronicoAPI.postComPontoEntrada(ponto_eletronico).success(function (data) {
                                                    delete $scope.ponto_eletronico;
                                                    // var alertPopup = $ionicPopup.alert({
                                                    //     title: 'Sucesso!',
                                                    //     template: 'Ponto de Entrada Batido!'
                                                    // });
                                                    alert('Você está a '+ dist +' kms do restaurante e bateu o ponto de entrada com sucesso!');
                                                    $scope.loginForm.$setPristine();
                                                })
                                            } else {
                                                ponto_eletronico.cod_funcionario = ponto_eletronico.cpf_funcionario;
                                                ponto_eletronico.ponto_hr_saida = $scope.today;
                                                pontoEletronicoAPI.putComPontoSaida(ponto_eletronico).success(function (data) {
                                                    delete $scope.ponto_eletronico;
                                                    // var alertPopup = $ionicPopup.alert({
                                                    //     title: 'Sucesso!',
                                                    //     template: 'Ponto de Saída Batido!'
                                                    // });
                                                    alert('Você está a '+ dist +' kms do restaurante e bateu o ponto de saída com sucesso!');
                                                    $scope.loginForm.$setPristine();
                                                });
                                            }
                                            // else {
                                            //     var alertPopup = $ionicPopup.alert({
                                            //         title: 'Falha!',
                                            //         template: 'Todos os pontos do dia já foram batidos!'
                                            //     });
                                            // }
                                        })
                                    })
                            } else {
                                alert('Ponto não autorizado porque o funcionário está a'+dist+' kms de distância do restaurante!')
                            }
                        });
                            // } else{
                            //     alert('Ponto negado! O funcionário não está no restaurante!')
                            //     $scope.loginForm.$setPristine();
                            // }
                    } else {
                        // var alertPopup = $ionicPopup.alert({
                        //     title: 'Falha!',
                        //     template: 'Dados Incorretos!'
                        // });
                        alert('Dados Incorretos!');
                        $scope.loginForm.$setPristine();
                    }
                });
        }

    })

.controller("CardapioCtrl", function ($scope, $http, cardapio)
    {
        $scope.cardapio = cardapio.data;
    })

.controller("AvaliacaoCtrl",function ($scope, $http, avaliacaoAPI, funcionario, $location)
    {
        $scope.notas = [{nota:1},{nota:2},{nota:3},
                        {nota:4},{nota:5}];

        $scope.closeAvaliacao = function() {
            $scope.modal.hide();
        };

        $scope.funcionario = funcionario.data;
        console.log($scope.funcionario);

        $scope.AdicionarAvaliacao = function(avaliacao) {
            avaliacaoAPI.postAvaliacao(avaliacao).success(function (data) {
                alert('Obrigado pela avaliação!')
                $location.path('#/app/Cardapio');
            });
        }
    })
;
