// api.js
let axios = require('axios')

let api = axios.create({
  baseURL: process.env.ROOT_API,
  widthCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default api
