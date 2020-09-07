<?php

include 'settings.php';

function validate($field, $value) {
    switch($field) {
        case "name":
            return true;
        break;
        case "amount":
            return !(filter_var($value, FILTER_VALIDATE_INT) === false);
        break;
        case "distance":
            return !(filter_var($value, FILTER_VALIDATE_FLOAT) === false);
        break;
        case "date":
            $dt = DateTime::createFromFormat("Y-m-d", $value);
            return $dt !== false && !array_sum($dt::getLastErrors());
        break;
    }
}

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    if(isset($_GET['query'])) {
        $query = $_GET['query'];
        if($query === 'get_table_data') {
            $mysqli = new mysqli($db_host, $db_username, $db_password);
            if(!$mysqli->connect_errno) {
                $mysqli->select_db($db_name);

                $field = $_GET['field'];
                $condition = $_GET['condition'];
                $value = $_GET['value'];
                if(isset($field) && isset($condition) && isset($value)) {
                    $conditions = ["equals" => "=", "greater" => ">", "less" => "<", "like" => "like"];
                    $cond = $conditions[$condition];
                    $validated = validate($field, $value);
                    if($condition === "like") {
                        $value = "%".$value."%";
                        $validated = true;
                    }
                    if($field === "date" || $field=="name" || $condition === "like") {
                        $value = "'".$value."'";
                    }

                    if($validated) {
                        $result = $mysqli->query("SELECT * FROM $table_name WHERE $field $cond $value");
                        if($result) {
                            $rows = array();
                            while($r = mysqli_fetch_assoc($result)) {
                                $rows[] = $r;
                            }
                            echo json_encode($rows);
                        } else {
                            echo http_response_code(400);
                        }
                    } else {
                        echo http_response_code(400);
                    }
                } else {
                    $result = $mysqli->query("SELECT * FROM $table_name");
                    if($result) {
                        $rows = array();
                        while($r = mysqli_fetch_assoc($result)) {
                            $rows[] = $r;
                        }
                        echo json_encode($rows);
                    } else {
                        echo http_response_code(400);
                    }
                }
            }
        }
    }
} else {
    echo http_response_code(400);
}
?>