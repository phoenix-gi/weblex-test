<?php
function drop_database($mysqli, $db_name) {
    echo "Cleaning previous database...\n";
    $mysqli->query("DROP DATABASE IF EXISTS $db_name");
}

function init_database($mysqli, $db_name, $table_name) {
    echo "Creating database $db_name...\n";

    $db_created = $mysqli->query("CREATE DATABASE IF NOT EXISTS $db_name");
    if($db_created) {
        $mysqli->select_db($db_name);
        echo "Creating table $table_name...\n";
        $table_created = $mysqli->query("CREATE TABLE IF NOT EXISTS $table_name(date DATE, name varchar(256), amount INT, distance FLOAT)");
    }
}

function insert_sample_rows($mysqli, $db_name, $table_name) {
    if($mysqli->select_db($db_name)) {
        $mysqli->set_charset('utf8');
        echo "Inserting sample rows to table $table_name...\n";
        for($i = 1; $i <= 12; $i++) {
            $mysqli->query("INSERT INTO $table_name VALUES (STR_TO_DATE('$i.$i.".(2000+$i)."','%d.%m.%Y'),'Name $i','$i','$i.$i')");
        }
    }
}

include "settings.php";

$mysqli = new mysqli($db_host, $db_username, $db_password);

if(!$mysqli->connect_errno) {
    echo "Connected to mysql.\n";

    $mysqli->set_charset('utf8');

    drop_database($mysqli, $db_name);

    init_database($mysqli, $db_name, $table_name);

    insert_sample_rows($mysqli, $db_name, $table_name);

    echo "Done.\n";
}
?>