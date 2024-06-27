<?php
require_once 'config.php';
require_once 'mysqlService.php';

if (isset($_POST['email']) && isset($_POST['location'])) {
    $email = $_POST['email'];
    $location = $_POST['location'];

    try {
        $mysql = new MysqlService(DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT);
        $isExist = $mysql->executeQuery("SELECT COUNT(*) FROM Subscriber WHERE email = '$email'")->fetchColumn();

        if ($isExist > 0) {
            echo json_encode(['success' => false, 'message' => 'Email already subscribed']);
        } else {
            $result = $mysql->executeQuery("INSERT INTO Subscriber (email, location) VALUES ('$email', '$location')");
            echo json_encode(['success' => true, 'message' => 'Subscribe successful']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'An error occurred. Please try again later. ' . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email and location are required']);
}
