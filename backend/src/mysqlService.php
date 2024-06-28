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
        try {
            $dsn = "pgsql:host=$this->dbHost;port=$this->dbPort;dbname=$this->dbName;user=$this->dbUser;password=$this->dbPassword";
            return new PDO($dsn);
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