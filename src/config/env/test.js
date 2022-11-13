class Config {
  constructor() {
    this.env = 'test'
    this.PORT = process.env.PORT || 3000
    this.API_BASE = '/api'
    this.CLIENT_URL = '*'
  }
}

module.exports = new Config()
