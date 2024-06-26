<?php
require_once 'config.php';
require_once 'mysqlService.php';

if (isset($_POST['email'])) {
    $email = $_POST['email'];
    $mysql = new MysqlService(DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT);
    echo json_encode($mysql->executeQuery("DELETE FROM Subscriber WHERE email = '$email'"));
}