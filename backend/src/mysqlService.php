<?php

class MysqlService {
    private $dbName;
    private $dbUser;
    private $dbPassword;
    private $dbHost;
    private $dbPort;

    public function __construct($dbName, $dbUser, $dbPassword, $dbHost, $dbPort) {
        $this->dbName = $dbName;
        $this->dbUser = $dbUser;
        $this->dbPassword = $dbPassword;
        $this->dbHost = $dbHost;
        $this->dbPort = $dbPort;
    }

    public function connect() {
        $dsn = "mysql:host={$this->dbHost};port={$this->dbPort};dbname={$this->dbName}";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        try {
            return new PDO($dsn, $this->dbUser, $this->dbPassword, $options);
        } catch (PDOException $e) {
            throw new PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    public function executeQuery($query) {
        try {
            $pdo = $this->connect();
            $stmt = $pdo->query($query);
            return $stmt;
        } catch (PDOException $e) {
            throw new PDOException($e->getMessage(), (int)$e->getCode());
        }
    }
}