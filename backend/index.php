<?php

header("Access-Control-Allow-Origin: *");
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

$host = 'weather_forecast.dpg-cpv30btumphs73c4o7e0-a.singapore-postgres.render.com';
$port = getenv('DB_PORT');
$dbname = getenv('DB_DATABASE_NAME');
$user = getenv('DB_USERNAME');
$password = getenv('DB_PASSWORD');

$dsn = "pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password";

echo $dsn . '<br>';

try {
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected to the database successfully!" . "<br>"; 

    $sql = "SELECT * FROM Subscriber";
    $stmt = $pdo->query($sql);
    $subscribers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print_r($subscribers);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}