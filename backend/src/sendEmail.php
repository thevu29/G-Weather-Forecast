<?php
require_once 'vendor/autoload.php';
require_once 'config.php';
require_once 'mysqlService.php';
require_once 'getWeather.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendEmail($email, $forecast) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'vnguyen132az@gmail.com';
        $mail->Password = 'ssufgpamhlktadym';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
    
        $mail->setFrom('vnguyen132az@gmail.com', 'Weather Forecast');
        $mail->addAddress($email);
    
        $mail->isHTML(true);
        $mail->Subject = 'Daily Weather Forecast';
        $content = "<h1>Weather Forecast for {$forecast['location']['name']} ({$forecast['location']['localtime']})</h1>";
        $content .= "<p>Temperature: {$forecast['current']['temp_c']}°C</p>";
        $content .= "<p>Condition: {$forecast['current']['condition']['text']}</p>";
        $content .= "<p>Humidity: {$forecast['current']['humidity']}%</p>";
        $content .= "<p>Wind Speed: {$forecast['current']['wind_mph']} mph</p>";
        $mail->Body = $content;
    
        return $mail->send();
    } catch (Exception $e) {
        echo "Error: {$mail->ErrorInfo}";
        return false;
    }
}

function sendDailyWeather() {
    $mysql = new MysqlService(DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT);
    $pdo = $mysql->connect();
    $stmt = $pdo->query('SELECT * FROM Subscriber');
    
    $subscribers = $stmt->fetchAll();
    $weatherData = getWeather();
    
    foreach ($subscribers as $subscriber) {
        sendEmail($subscriber['email'], $weatherData);
    }
}

if (isset($_POST['email'])) {
    $email = $_POST['email'];
    $weatherData = getWeather();
    $result = sendEmail($email, $weatherData);
    echo json_encode(['success' => $result]);
}