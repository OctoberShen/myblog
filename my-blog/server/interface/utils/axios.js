// import axios from 'axios'
const axios = require('axios')
const instance = axios.create({
  baseURL: `http://${process.env.HOST || 'localhost'}:${process.env.PORT||3000}`,
  timeout: 1000,
  headers: {

  }
})

// export default instance
module.exports = instance
