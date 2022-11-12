const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/sequelize')
const cors = require('cors')
const {getProfile} = require('./middleware/getProfile')
const app = express();
const config = require('./config')
const routes = require('./routes')

app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

app.use(express.json())
app.use(
    cors({
      origin: config.CLIENT_URL,
      methods: 'GET,PUT,POST,OPTIONS, DELETE',
      allowedHeaders: 'Accept, Content-Type, Authorization, profile_id'
    })
  )

  app.all(`${config.API_BASE}*`, (req, res, next) => {
    getProfile(req, res, next)
  })

app.use(config.API_BASE, routes)

module.exports = app;

