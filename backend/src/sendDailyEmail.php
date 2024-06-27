<?php
require_once 'vendor/autoload.php';
require_once 'config.php';
require_once 'mysqlService.php';
require_once 'getWeather.php';
require_once 'sendEmail.php';

$mysql = new MysqlService(DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT);
$pdo = $mysql->connect();
$stmt = $pdo->query('SELECT * FROM Subscriber');
$subscribers = $stmt->fetchAll();

foreach ($subscribers as $subscriber) {
    $weatherData = getWeather($subscriber['location']);
    sendEmail($subscriber['email'], $weatherData);
}