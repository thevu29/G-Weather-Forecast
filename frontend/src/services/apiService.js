import axios from '../utils/axiosCustomize'

const getWeather = (location) => {
    return axios.get('weather', {
        params: {
            location: location
        }
    })
}

const postSubscribe = (email, location) => {
    const data = new FormData()
    data.append('email', email)
    data.append('location', location)
    return axios.post('subscribe', data)
}

const postUnsubscribe = (email) => {
    const data = new FormData()
    data.append('email', email)
    return axios.post('unsubscribe', data)
}

const postSendEmail = (email, location) => {
    const data = new FormData()
    data.append('email', email)
    data.append('location', location)
    return axios.post('send-email', data)
}

export { getWeather, postSubscribe, postUnsubscribe, postSendEmail }