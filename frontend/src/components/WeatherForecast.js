import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import { getWeather } from '../services/apiService'

const WeatherForecast = () => {
    const [location, setLocation] = useState('')
    const [weather, setWeather] = useState(null)
    const [validated, setValidated] = useState(false)

    const fetchWeather = async () => {
        const res = await getWeather(location)
        res.data.error ? alert(`Error ${res.data.error.code}: ${res.data.error.message}`) : setWeather(res.data)
    }

    useEffect(() => {
        fetchWeather()
    }, [])

    const handleSubmitLocation = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity()) {
            fetchWeather()
        }
        setValidated(true)
    }

    return (
        <Row>
            <Col>
                <Form noValidate validated={validated} onSubmit={handleSubmitLocation}>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Enter a City Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="E.g, Ho Chi Minh, Ha Noi"
                            required
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" className="w-100 btn" type="submit">Search</Button>
                    <h2 className="hr-text"><span>Or</span></h2>
                    <Button variant="secondary" className="w-100 btn">Use Current Location</Button>
                </Form>
            </Col>
            <Col xs={8}>
                {weather && (
                    <div className="weather-container d-flex justify-content-between align-items-center">
                        <div>
                            <h3>{weather?.location?.name} ({weather?.location?.localtime})</h3>
                            <p>Temperature: {weather?.current?.temp_c}&deg;C</p>
                            <p>Wind: {weather?.current?.wind_mph} mph</p>
                            <p>Humidity: {weather?.current?.humidity}%</p>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img
                                src={weather?.current?.condition?.icon}
                                alt=""
                                width={100}
                                height={100}
                            />
                            <p>{weather?.current?.condition?.text}</p>
                        </div>
                    </div>
                )}
                <div className="weather-future-container">
                    <h2>4-Day Forecast</h2>
                    <div className="d-flex justify-content-between flex-wrap">
                        {weather && weather.forecast && weather.forecast.forecastday && weather.forecast.forecastday.length > 0 &&
                            weather.forecast.forecastday.map((item, index) => {
                                return (
                                    <div className="weather-item" key={index}>
                                        <p className="fw-bold">({item?.date})</p>
                                        <img
                                            src={item?.day?.condition?.icon}
                                            alt=""
                                            width={50}
                                            height={50}
                                        />
                                        <p>Temp: {item?.day?.avgtemp_c}&deg;C</p>
                                        <p>Wind: {item?.day?.maxwind_mph} mph</p>
                                        <p>Humidity: {item?.day?.avghumidity}%</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default WeatherForecast