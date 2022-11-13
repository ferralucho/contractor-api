const express = require('express')
const router = express.Router()
const contractsRoutes = require('./contracts')
const jobsRoutes = require('./jobs')

router.use('/contracts', contractsRoutes)
router.use('/jobs', jobsRoutes)

module.exports = router
