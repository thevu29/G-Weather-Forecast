<?php
require './vendor/autoload.php';
require './src/Weather.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$location = isset($_GET['location']) ? $_GET['location'] : 'Ho Chi Minh';
$weatherAPI = new Weather('2d3af1d1640a4237b9374444242406');

$weatherData = $weatherAPI->getWeather($location);
echo json_encode($weatherData);