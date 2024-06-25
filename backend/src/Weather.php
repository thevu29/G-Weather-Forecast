<?php

class Weather {
    private $apiKey;

    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
    }

    public function getWeather($location) {
        $url = 'https://api.weatherapi.com/v1/forecast.json?key=' . urlencode($this->apiKey) . '&q=' . urlencode($location) . '&days=4&aqi=no&alerts=no';
        // $url = 'https://api.weatherapi.com/v1/forecast.json?key=2d3af1d1640a4237b9374444242406&q=Ho Chi Minh&days=4&aqi=no&alerts=no';

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
}