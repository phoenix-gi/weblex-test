<?php

include 'settings.php';

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    if(isset($_GET['query'])) {
        $query = $_GET['query'];
        if($query === 'get_all_rows') {
            $mysqli = new mysqli($db_host, $db_username, $db_password);
            if(!$mysqli->connect_errno) {
                $mysqli->select_db($db_name);
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
?>