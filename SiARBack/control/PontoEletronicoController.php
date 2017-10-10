<?php

include_once "model/Request.php";
include_once "model/ponto_eletronico.php";
include_once "database/DBConnector.php";

class PontoEletronicoController
{
    public function register($request)
    {
        $params = $request->get_params();
        $point = new ponto_eletronico
        ($params["idt_ponto_eletronico"],
            $params["cod_funcionario"],
            $params["ponto_hr_entrada"],
            $params["ponto_hr_saida"]);

        $db = new DBConnector("localhost", "bd_siar", "mysql", "", "root", "");

        $conn = $db->getConnection();


        return $conn->query($this->generateInsertQuery($point));
    }

    private function generateInsertQuery($point)
    {
        $query =  "INSERT INTO tb_ponto_eletronico (cod_funcionario, ponto_hr_entrada, ponto_hr_saida) 
                   VALUES   ('".$point->getCodFuncionario()."','".
                                $point->getPontoHrEntrada()."','".
                                $point->getPontoHrSaida()."')";

        return $query;
    }

    public function search($request)
    {
        $params = $request->get_params();
        $crit = $this->generateCriteria($params);

        $db = new DBConnector("localhost", "bd_siar", "mysql", "", "root", "");

        $conn = $db->getConnection();

        $result = $conn->query("SELECT pe.cod_funcionario, func.nme_funcionario, f.dsc_funcao, pe.ponto_hr_entrada,pe.ponto_hr_saida
                                          FROM tb_ponto_eletronico AS pe, tb_funcionario AS func, tt_funcao AS f
                                          WHERE func.cpf_funcionario = pe.cod_funcionario AND
                                                f.idt_funcao = func.cod_funcao AND ".$crit.
                                        " ORDER BY func.nme_funcionario ASC, pe.ponto_hr_entrada ASC ");

       // $result = $conn->query("SELECT * FROM tb_ponto_eletronico WHERE ".$crit);


        return $result->fetchAll(PDO::FETCH_ASSOC);

    }

    private function generateCriteria($params)
    {
        $criteria = "";
        foreach($params as $key => $value)
        {
            $criteria = $criteria.$key." LIKE '%".$value."%' AND ";
        }

        return substr($criteria, 0, -4);
    }

//    public function searchPontoEntrada($request)
//    {
//        $params = $request->get_params();
//        $crit = $this->generateCriteria($params);
//
//        $db = new DBConnector("localhost", "bd_siar", "mysql", "", "root", "");
//
//        $conn = $db->getConnection();
//
//        $result = $conn->query("SELECT pe.ponto_hr_entrada
//                                          FROM tb_ponto_eletronico AS pe, tb_funcionario AS func
//                                          WHERE func.cpf_funcionario = pe.cod_funcionario AND ".$crit);
//
//        // $result = $conn->query("SELECT * FROM tb_ponto_eletronico WHERE ".$crit);
//
//
//        return $result->fetchAll(PDO::FETCH_ASSOC);
//
//    }

    public function update($request)
    {
        $params = $request->get_params();

        $db = new DBConnector("localhost", "bd_siar", "mysql", "", "root", "");

        $conn = $db->getConnection();

        return $conn->query($this->generateUpdateQuery($params));
    }

    private function generateUpdateQuery($params)
    {
        var_dump($params);

//        return  "UPDATE tb_ponto_eletronico SET ponto_hr_saida = " . " '" .$params["ponto_hr_saida"] ."' " .
    $sql =  "UPDATE tb_ponto_eletronico SET ponto_hr_saida = " . " '" .$params["ponto_hr_saida"] ."' " .
            " WHERE ponto_hr_saida = '0000-00-00 00:00:00' AND   cod_funcionario = '" .$params["cod_funcionario"]."'";

    var_dump($sql);

    return $sql;
//            " WHERE cod_funcionario = '" . $params["cod_funcionario"] .
//            "' AND   ponto_hr_entrada LIKE ". " '" .$params["ponto_hr_entrada"]."%'" ;
//        return "UPDATE tb_ponto_eletronico SET " . $crit . " WHERE idt_ponto_eletronico = '" . $params["idt_ponto_eletronico"] . "'";
    }
    private function generateUpdateCriteria($params)
    {
        $criteria = "";
        foreach ($params as $key => $value)
        {
            $criteria = $criteria.$key." = '".$value."' ,";
        }

        return substr($criteria, 0, -2);
    }

    public function remove($request)
    {
        $params = $request->get_params();

        $db = new DBConnector("localhost", "bd_siar", "mysql", "", "root", "");

        $conn = $db->getConnection();

        $result = $conn->prepare("DELETE FROM tb_ponto_eletronico WHERE idt_ponto_eletronico = ?");

        $result->bindParam(1, $params['idt_ponto_eletronico']);

        $result->execute();

        return $result;
    }

    private function isValid($parameters)
    {
        $keys = array_keys($parameters);
        $diff1 = array_diff($keys, $this->requiredParameters);
        $diff2 = array_diff($this->requiredParameters, $keys);
        if (empty($diff2) && empty($diff1))
            return false;
    }
}