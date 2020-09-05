<?php
if($_SERVER["REQUEST_URI"] == "/") {
    include "src/php/index.php";
} else {
    return false;
}
?>
