<?php

include 'settings.php';

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    if(isset($_GET['query'])) {
        $query = $_GET['query'];
        if($query === 'get_table_data') {
            $mysqli = new mysqli($db_host, $db_username, $db_password);
            if(!$mysqli->connect_errno) {
                $mysqli->select_db($db_name);

                $clause = "";

                $field = $_GET['field'];
                $condition = $_GET['condition'];
                $value = $_GET['value'];
                if(isset($field) && isset($condition) && isset($value)) {
                    $conditions = ["equals" => "=", "greater" => ">", "less" => "<", "like" => "like"];
                    $cond = $conditions[$condition];
                    if($condition === "like") {
                        $value = "'%".$value."%'";
                    }
                    $result = $mysqli->query("SELECT * FROM $table_name WHERE $field $cond $value");
                    $rows = array();
                    while($r = mysqli_fetch_assoc($result)) {
                        $rows[] = $r;
                    }
                    echo json_encode($rows);
                } else {
                    $result = $mysqli->query("SELECT * FROM $table_name");
                    $rows = array();
                    while($r = mysqli_fetch_assoc($result)) {
                        $rows[] = $r;
                    }
                    echo json_encode($rows);
                }
            }
        }
    }
}
?>