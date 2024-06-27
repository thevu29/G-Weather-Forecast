# Weather Forecast

This is a simple weather forecast application using PHP for the backend and ReactJS for the frontend.

## Setup Instructions

### Backend (PHP)

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```

2. Install dependencies:
    ```sh
    composer install
    ```

3. Build and run the Docker containers:
    ```sh
    docker-compose up
    ```

### Frontend (ReactJS)

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Run the React development server:
    ```sh
    npm start
    ```
    
### Live Demo

- [Weather Forecast](https://g-weather-forecast-red.vercel.app/)

### API Documentation

- Use service from api provider https://www.weatherapi.com (free version)

### Error
When run locally, if you get the error: `Fatal error:  Uncaught PDOException: could not find driver in /var/www/html/src/mysqlService.php:39`. Open the interactive terminal with your docker container that's running the `www` service and run the command: 
```sh
docker-php-ext-install pdo pdo_mysql && docker-php-ext-enable pdo pdo_mysql && apachectl restart
```

