import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://tiktok-clonebackend.herokuapp.com/'
})

export default instance
