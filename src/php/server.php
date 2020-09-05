<?php
if($_SERVER["REQUEST_URI"] == "/") {
    include "index.php";
} else {
    return false;
}
?>
