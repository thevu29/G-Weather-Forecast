import './App.css'
import Container from 'react-bootstrap/Container'
import WeatherForecast from './components/WeatherForecast'

function App() {
    return (
        <div className="app-container">
            <header className="header-container">
                <h1>Weather Dashboard</h1>
            </header>
            <div className="content-container">
                <Container>
                    <WeatherForecast />
                </Container>
            </div>
        </div>
    )
}

export default App