const config = require(`./env/${process.env.NODE_ENV || 'development'}.js`)
module.exports = config
