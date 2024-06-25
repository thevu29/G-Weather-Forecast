import './App.css'
import Container from 'react-bootstrap/Container'
import WeatherForecast from './components/WeatherForecast'
import SearchHistory from './components/SearchHistory'
import { useEffect, useState } from 'react'

const App = () => {
    const [history, setHistory] = useState([])

    useEffect(() => {
        const localHistory = JSON.parse(localStorage.getItem('history')) || []
        setHistory(localHistory)
    }, [])

    const handleSaveHistory = (weather) => {
        const localHistory = JSON.parse(localStorage.getItem('history')) || []
        const isExist = localHistory.find(item =>
            item?.location?.last_updated === weather?.location?.last_updated && item?.location?.name === weather?.location?.name
        )
        if (!isExist) {
            const newHistory = [weather, ...localHistory]
            setHistory(newHistory)
            localStorage.setItem('history', JSON.stringify(newHistory))
        }
    }

    return (
        <div className="app-container">
            <header className="header-container">
                <h1>Weather Dashboard</h1>
            </header>
            <div className="content-container">
                <Container>
                    <WeatherForecast handleSaveHistory={handleSaveHistory} />
                    <SearchHistory history={history} />
                </Container>
            </div>
        </div>
    )
}

export default App