<?php

header("Access-Control-Allow-Origin: https://g-weather-forecast-red.vercel.app/");
header("Content-Type: application/json; charset=UTF-8");

$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($requestUri) {
    case '/weather':
        require './src/getWeather.php';
        break;
    case '/send-email':
        require './src/sendEmail.php';
        break;
    case '/subscribe':
        require './src/subscribe.php';
        break;
    case '/unsubscribe':
        require './src/unsubscribe.php';
        break;
    default:
        http_response_code(404);
        echo '404 Not Found';
        break;
}