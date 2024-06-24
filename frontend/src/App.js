import './App.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function App() {
  return (
    <div className="app-container">
      <header className="header-container">
        <h1>Weather Dashboard</h1>
      </header>
      <div className="content-container">
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label className="fw-bold">Enter a City Name</Form.Label>
                  <Form.Control type="text" placeholder="E.g, Ho Chi Minh, Ha Noi" />
                </Form.Group>
                <Button variant="primary" className="w-100 btn">Search</Button>
                <h2 className="hr-text"><span>Or</span></h2>
                <Button variant="secondary" className="w-100 btn">Use Current Location</Button>
              </Form>
            </Col>
            <Col xs={8}>
              <div className="weather-container d-flex justify-content-between align-items-center">
                <div>
                  <h3>London (2023-06-19)</h3>
                  <p>Temperature: 18.71&deg;C</p>
                  <p>Wind: 4.31 M/S</p>
                  <p>Humidity: 76%</p>
                </div>
                <div>
                  <img src="https://i.pinimg.com/564x/f8/0a/01/f80a017368905501cf50d640abd6bbbc.jpg" alt="" width={100} height={100} />
                  <p>Moderate rain</p>
                </div>
              </div>
              <div className="weather-future-container">
                <h2>4-Day Forcast</h2>
                <div className="d-flex justify-content-between flex-wrap">
                  <div className="weather-item">
                    <p className="fw-bold">(2023-06-20)</p>
                    <img src="https://i.pinimg.com/564x/f8/0a/01/f80a017368905501cf50d640abd6bbbc.jpg" alt="" width={50} height={50} />
                    <p>Temp: 18.71&deg;C</p>
                    <p>Wind: 4.31 M/S</p>
                    <p>Humidity: 76%</p>
                  </div>
                  <div className="weather-item">
                    <p className="fw-bold">(2023-06-20)</p>
                    <img src="https://i.pinimg.com/564x/f8/0a/01/f80a017368905501cf50d640abd6bbbc.jpg" alt="" width={50} height={50} />
                    <p>Temp: 18.71&deg;C</p>
                    <p>Wind: 4.31 M/S</p>
                    <p>Humidity: 76%</p>
                  </div>
                  <div className="weather-item">
                    <p className="fw-bold">(2023-06-20)</p>
                    <img src="https://i.pinimg.com/564x/f8/0a/01/f80a017368905501cf50d640abd6bbbc.jpg" alt="" width={50} height={50} />
                    <p>Temp: 18.71&deg;C</p>
                    <p>Wind: 4.31 M/S</p>
                    <p>Humidity: 76%</p>
                  </div>
                  <div className="weather-item">
                    <p className="fw-bold">(2023-06-20)</p>
                    <img src="https://i.pinimg.com/564x/f8/0a/01/f80a017368905501cf50d640abd6bbbc.jpg" alt="" width={50} height={50} />
                    <p>Temp: 18.71&deg;C</p>
                    <p>Wind: 4.31 M/S</p>
                    <p>Humidity: 76%</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default App