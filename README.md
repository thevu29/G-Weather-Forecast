# Weather Forecast

## Setup Instructions for Running Locally

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
    docker-compose up --build
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
4. If you run locally, comment `baseURL: 'https://g-weather-forecast-wqlp.onrender.com/'`, and uncomment `baseURL: 'http://localhost:8081/'` in `frontend/utils/axiosCustomize.js` 
    
### API Documentation

- Getting weather from api provider https://www.weatherapi.com (free version)
- Verifying email existence from api provider https://hunter.io/
