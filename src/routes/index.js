const express = require('express')
const router = express.Router()
const contractsRoutes = require('./contracts')
const jobsRoutes = require('./jobs')
const balancesRoutes = require('./balances')
const adminRoutes = require('./admin')

router.use('/contracts', contractsRoutes)
router.use('/jobs', jobsRoutes)
router.use('/balances', balancesRoutes)
router.use('/admin', adminRoutes)

module.exports = router
