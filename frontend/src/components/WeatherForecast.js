import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import NProgress from 'nprogress'
import { useEffect, useState } from 'react'
import { getWeather, postSubscribe, postUnsubscribe, postSendEmail } from '../services/apiService'

const WeatherForecast = (props) => {
    const [location, setLocation] = useState('')
    const [weather, setWeather] = useState(null)
    const [email, setEmail] = useState('')
    const [cityValidate, setCityValidate] = useState(false)
    const [emailValidate, setEmailValidate] = useState(false)
    const [dayForecast, setDayForecast] = useState(4)
    const { handleSaveHistory } = props

    const fetchWeather = async () => {
        NProgress.start()
        const res = await getWeather(location, dayForecast)
        if (res.error) {
            alert(res.error.message)
        } else {
            setWeather(res)
        }
        NProgress.done()
        return res
    }

    useEffect(() => {
        fetchWeather()
    }, [dayForecast])

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    const handleSearchLocation = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity()) {
            NProgress.start()
            const weather = await fetchWeather()
            if (!weather.error) {
                handleSaveHistory(weather)
            }
            NProgress.done()
        }
        setCityValidate(true)
    }

    const handleSubscribe = async (e) => {
        const form = e.currentTarget

        if (form.checkValidity() && validateEmail(email) && location) {
            const subscribeRes = await postSubscribe(email, location)

            if (!subscribeRes.success) {
                alert(subscribeRes.message)
            } else {
                const sendEmailRes = await postSendEmail(email, location)

                if (!sendEmailRes.success) {
                    alert(sendEmailRes.message)
                } else {
                    alert(`Subscribe successfully! We just sent you an email about today's weather forecast.\nIn the following days you will receive daily weather forecasts.\nIf you do not receive the email, please check your spam box or inform us!`)
                    resetForm()
                }
            }
        }
        setCityValidate(true)
        setEmailValidate(true)
    }

    const handleUnsubscribe = async (e) => {
        const form = e.currentTarget

        if (form.checkValidity() && validateEmail(email)) {
            const unsubscribeRes = await postUnsubscribe(email)

            if (!unsubscribeRes.success) {
                alert(unsubscribeRes.message)
            } else {
                alert(`Unsubscribe successfully! You will no longer receive daily weather forecasts from us.\nIf you want to subscribe again, please enter your email and click the Subscribe button!`)
                resetForm()
            }
        }
        setEmailValidate(true)
    }

    const handleLoadMore = async () => {
        setDayForecast(7)
        fetchWeather()
    }

    const resetForm = () => {
        setLocation('')
        setEmail('')
    }

    return (
        <Row>
            <Col>
                <Form noValidate validated={cityValidate} onSubmit={handleSearchLocation}>
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
                            Please provide a valid city
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" className="w-100 btn" type="submit">Search</Button>
                </Form>
                <Form noValidate validated={emailValidate} className="mt-5">
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Register for daily announcement</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email
                        </Form.Control.Feedback>
                        <div className="d-flex align-items-center justify-content-between mt-3" style={{ gap: 10 }}>
                            <Button
                                variant="primary"
                                className="w-100 btn"
                                onClick={handleSubscribe}
                            >
                                Subscribe
                            </Button>
                            <Button
                                variant="primary"
                                className="w-100 btn"
                                onClick={handleUnsubscribe}
                            >
                                Unsubscribe
                            </Button>
                        </div>
                    </Form.Group>
                </Form>
            </Col>
            <Col lg={8} md={12}>
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
                    <h2>{dayForecast}-Day Forecast</h2>
                    <div className="weather-future-container__box">
                        {weather && weather.forecast && weather.forecast.forecastday && weather.forecast.forecastday.length > 0 &&
                            weather.forecast.forecastday.map((item, index) => {
                                return (
                                    <div className="weather-item" key={index}>
                                        <p className="fw-bold">({item?.date})</p>
                                        <div className="weather-image-container">
                                            <img
                                                src={item?.day?.condition?.icon}
                                                alt=""
                                                width={50}
                                                height={50}
                                            />
                                            <span style={{ fontSize: 14, maxWidth: 110 }}>{item?.day?.condition?.text}</span>
                                        </div>
                                        <p>Temp: {item?.day?.avgtemp_c}&deg;C</p>
                                        <p>Wind: {item?.day?.maxwind_mph} mph</p>
                                        <p>Humidity: {item?.day?.avghumidity}%</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {dayForecast === 4 && (
                        <div className="d-flex justify-content-center mt-3">
                            <Button
                                variant="primary"
                                className="btn"
                                onClick={handleLoadMore}
                            >
                                Load More
                            </Button>
                        </div>
                    )}
                </div>
            </Col>
        </Row>
    )
}

export default WeatherForecast