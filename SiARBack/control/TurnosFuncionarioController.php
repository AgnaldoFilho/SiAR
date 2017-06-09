<?php

include_once "model/Request.php";
include_once "model/turnos_funcionario.php";
include_once "database/DBConnector.php";

class TurnosFuncionarioController
{
    public function register($request)
    {
        $params = $request->get_params();
        $employee_shift = new turnos_funcionario
        ($params["idt_turnos_funcionario"],
            $params["cod_funcionario"],
            $params["cod_dia"],
            $params["cod_turno"]);

        $db = new DBConnector("localhost", "bd_siar", "mysql", "", "root", "");

        $conn = $db->getConnection();


        return $conn->query($this->generateInsertQuery($employee_shift));
    }

    private function generateInsertQuery($employee_shift)
    {
        $query =  "INSERT INTO ta_turnos_funcionario (cod_funcionario, cod_dia, cod_turno) 
                   VALUES   ('".$employee_shift->getCodFuncionario()."','".
                                $employee_shift->getCodDia()."','".
                                $employee_shift->getCodTurno()."')";

        return $query;
    }

    public function search($request)
    {
        $params = $request->get_params();
        $crit = $this->generateCriteria($params);

        $db = new DBConnector("localhost", "bd_siar", "mysql", "", "root", "");

        $conn = $db->getConnection();

        $result = $conn->query("SELECT func.nme_funcionario, d.dsc_dia, t.dsc_turno 
                                          FROM ta_turnos_funcionario tf, tb_funcionario func, tt_dia d, tt_turno t 
                                          WHERE tf.cod_funcionario = func.cpf_funcionario 
                                          AND tf.cod_dia = d.idt_dia
                                          AND tf.cod_turno = t.idt_turno AND ".$crit);

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


    public function update($request)
    {
        $params = $request->get_params();

        $db = new DBConnector("localhost", "bd_siar", "mysql", "", "root", "");

        $conn = $db->getConnection();

        return $conn->query($this->generateUpdateQuery($params));
    }

    private function generateUpdateQuery($params)
    {
        $crit = $this->generateUpdateCriteria($params);

        return "UPDATE ta_turnos_funcionario SET " . $crit . " WHERE idt_turnos_funcionario = '" . $params["idt_turnos_funcionario"] . "'";
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

        $result = $conn->prepare("DELETE FROM ta_turnos_funcionario WHERE idt_turnos_funcionario= ?");

        $result->bindParam(1, $params['idt_turnos_funcionario']);

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