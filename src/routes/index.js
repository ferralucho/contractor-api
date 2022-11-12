const express = require('express')
const router = express.Router()
const contractsRoutes = require('./contracts')

router.use('/contracts', contractsRoutes)

module.exports = router
