<?php
require_once 'config.php';
require_once 'mysqlService.php';

if (isset($_POST['email'])) {
    $email = $_POST['email'];
    try {
        $mysql = new MysqlService(DB_DATABASE_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT);
        $isExist = $mysql->executeQuery("SELECT COUNT(*) FROM Subscriber WHERE email = '$email'")->fetchColumn();
        
        if ($isExist <= 0) {
            echo json_encode(['success' => false, 'message' => 'Email have not been subscribed yet']);
        } else {
            $result = $mysql->executeQuery("DELETE FROM Subscriber WHERE email = '$email'");
            echo json_encode(['success' => true, 'message' => 'Unsubscribe successful']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'An error occurred. Please try again later.', 'error' => $e->getMessage()]);
    }
}