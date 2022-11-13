const express = require('express')
const router = express.Router()
const contractsRoutes = require('./contracts')
const jobsRoutes = require('./jobs')
const balancesRoutes = require('./balances')

router.use('/contracts', contractsRoutes)
router.use('/jobs', jobsRoutes)
router.use('/balances', balancesRoutes)

module.exports = router
