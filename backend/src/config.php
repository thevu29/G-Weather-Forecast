<?php

define('WEATHER_API_KEY', getenv('WEATHER_API_KEY') ?: '2d3af1d1640a4237b9374444242406');
define('DB_HOST', getenv('DB_HOST'));
define('DB_PORT', getenv('DB_PORT'));
define('DB_NAME', getenv('DB_NAME'));
define('DB_USER', getenv('DB_USER'));
define('DB_PASSWORD', getenv('DB_PASSWORD'));

$ip = gethostbyname(DB_HOST);
if ($ip == DB_HOST) {
    echo $ip;
    die("Hostname resolution failed for DB_HOST: " . DB_HOST . "\n");
}
echo "Resolved IP for DB_HOST: " . $ip . "\n";