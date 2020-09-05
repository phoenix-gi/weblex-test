<?php
$host = 'localhost';
$username = 'root';
$password = '';

$db_name = "weblex_db";
$table_name = "weblex_table";

$mysqli = new mysqli($host, $username, $password);
if(!$mysqli->connect_errno) {
    $mysqli->set_charset('utf8');
    echo "Connected to mysql\n";
    echo "Creating database (if not exist) with name $db_name...\n";

    $db_created = $mysqli->query("CREATE DATABASE IF NOT EXISTS $db_name");
    if($db_created) {
        $mysqli->select_db($db_name);
        echo "Creating table (if not exist) with name $table_name"\n;
        $table_created = $mysqli->query("CREATE TABLE IF NOT EXISTS $table_name(date DATE, name varchar(256), amount INT, distance FLOAT)");
        if($table_created) {
            echo "Table $table_name created\n";
        }
    }
}
?>