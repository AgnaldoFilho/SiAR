<?php

include_once "model/Request.php";
include_once "control/FuncionarioController.php";
include_once "control/CardapioController.php";
include_once "control/CategoriaController.php";
include_once "control/FuncaoController.php";
include_once "control/TurnosFuncionarioController.php";
include_once "control/PontoEletronicoController.php";
include_once "control/DiaController.php";
include_once "control/TurnoController.php";
include_once "control/EstadoCivilController.php";
include_once "control/RestauranteController.php";

class ResourceController
{

	private $controlMap = 
	[
		"funcionario" => "FuncionarioController",
        "cardapio" => "CardapioController",
		"categoria" => "CategoriaController",
        "turnos_funcionario" => "TurnosFuncionarioController",
        "funcao" => "FuncaoController",
        "ponto_eletronico"=> "PontoEletronicoController",
        "dia" => "DiaController",
        "turno" => "TurnoController",
        "estado_civil" => "EstadoCivilController",
        "restaurante" => "RestauranteController",
	];

	public function createResource($request)
	{
		return (new $this->controlMap[$request->get_resource()]())->register($request);
	}

	public function searchResource($request)
	{
		return (new $this->controlMap[$request->get_resource()]())->search($request);
	}

	public function updateResource($request)
	{
		return (new $this->controlMap[$request->get_resource()]())->update($request);
	}

	public function removeResource($request)
	{
		return (new $this->controlMap[$request->get_resource()]())->remove($request);
	}
}