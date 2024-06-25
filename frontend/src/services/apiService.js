import axios from 'axios'

const getWeather = (location) => {
    return axios.get(`http://localhost/?location=${location}`)
}

export { getWeather }