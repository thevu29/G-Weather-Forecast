<?php

class Weather {
    private $apiKey;

    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
    } 

    public function getWeather($location) {
        $url = "http://api.weatherapi.com/v1/current.json?key=$this->apiKey&q=$location&aqi=no";
        $response = file_get_contents($url);
        return json_decode($response, true);
    }
}