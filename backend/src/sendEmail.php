<?php
require_once 'vendor/autoload.php';
require_once 'config.php';
require_once 'mysqlService.php';
require_once 'getWeather.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendEmail($email, $weatherData) {
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
        $content = "<h1>Weather Forecast for {$weatherData['location']['name']} ({$weatherData['location']['localtime']})</h1>";
        $content .= "<p>Temperature: {$weatherData['current']['temp_c']}°C</p>";
        $content .= "<p>Condition: {$weatherData['current']['condition']['text']}</p>";
        $content .= "<p>Humidity: {$weatherData['current']['humidity']}%</p>";
        $content .= "<p>Wind Speed: {$weatherData['current']['wind_mph']} mph</p>";
        $mail->Body = $content;
    
        return $mail->send();
    } catch (Exception $e) {
        echo "Error: {$mail->ErrorInfo}";
        return false;
    }
}

if (isset($_POST['email']) && isset($_POST['location'])) {
    $email = $_POST['email'];
    $location = $_POST['location'];

    $weatherData = getWeather($location);
    if ($weatherData === false) {
        echo json_encode(['success' => false, 'message' => 'Failed to retrieve weather data']);
        exit;
    }

    $result = sendEmail($email, $weatherData);
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send email']);
    }
}