class Config {
    constructor () {
      this.env = 'development'
      this.PORT = process.env.PORT || 3000
      this.API_BASE = '/api'
      this.CLIENT_URL = 'http://localhost:8081'
    }
  }
  
  module.exports = new Config()
  