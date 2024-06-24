<?php
require '../vendor/autoload.php';
require '../src/config.php';
require '../src/Weather.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$location = isset($_GET['location']) ? $_GET['location'] : 'London';
$weatherAPI = new Weather(API_KEY);

$weatherData = $weatherAPI->getWeather($location);
echo json_encode($weatherData);