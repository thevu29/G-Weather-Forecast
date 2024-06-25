<?php
require './vendor/autoload.php';
require './src/Weather.php';

try {
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    if (isset($_GET['location'])) {
        $location = $_GET['location'] !== '' ? $_GET['location'] : 'Ho Chi Minh';
    } else {
        $location = 'Ho Chi Minh';
    }

    $weatherAPI = new Weather('2d3af1d1640a4237b9374444242406');
    $weatherData = $weatherAPI->getWeather($location);
    echo json_encode($weatherData);
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}