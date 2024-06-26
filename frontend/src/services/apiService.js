import axios from '../utils/axiosCustomize'

const getWeather = (location) => {
    return axios.get('weather', {
        params: {
            location: location
        }
    })
}

export { getWeather }