import axios from 'axios'

export default axios.create({
    baseURL: (process.env.NODE_ENV !== 'production') ? 'http://localhost:3004/' : 'http://52.199.253.219:3004/'
});


