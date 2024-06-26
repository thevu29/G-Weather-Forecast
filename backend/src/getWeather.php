<?php
require_once 'config.php';

function getWeather($location = 'Ho Chi Minh') {
    $url = 'https://api.weatherapi.com/v1/forecast.json?key=' . urlencode(WEATHER_API_KEY) . '&q=' . urlencode($location) . '&days=4&aqi=no&alerts=no';

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    if ($httpCode != 200) {
        $error = json_decode($response, true);
        if (isset($error['error'])) {
            return $error;
        } else {
            return [
                'error' => [
                    'code' => $httpCode,
                    'message' => 'An unknown error occurred.'
                ]
            ];
        }
    }

    curl_close($curl);
    return json_decode($response, true);
}

if (isset($_GET['location'])) {
    $location = $_GET['location'] !== '' ? $_GET['location'] : 'Ho Chi Minh';
    $weatherData = getWeather($location);
    echo json_encode($weatherData);
}