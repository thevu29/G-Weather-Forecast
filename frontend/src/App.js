import './App.css'
import Container from 'react-bootstrap/Container'
import WeatherForecast from './components/WeatherForecast'
import SearchHistory from './components/SearchHistory'
import { useEffect, useState } from 'react'

const App = () => {
    const [history, setHistory] = useState([])

    useEffect(() => {
        const localHistory = JSON.parse(localStorage.getItem('history')) || []
        const today = new Date().toISOString().split('T')[0]

        if (today !== localHistory.date) {      // remove hitory on new day
            localStorage.clear()
        }

        setHistory(localHistory?.data)
    }, [])

    const handleSaveHistory = (weather) => {
        const localHistory = JSON.parse(localStorage.getItem('history')) || []

        const isExist = localHistory.length && localHistory.data.find(item =>
            item?.location?.last_updated === weather?.location?.last_updated && item?.location?.name === weather?.location?.name
        )

        if (!isExist) {
            localHistory.data = localHistory.data || []
            const newHistory = [weather, ...localHistory.data]
            setHistory(newHistory)
            localStorage.setItem('history', JSON.stringify({ 'date': new Date().toISOString().split('T')[0], 'data': newHistory }))
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