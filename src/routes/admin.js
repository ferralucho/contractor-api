const express = require('express')
const router = express.Router()
const AdminService = require('../services/admin')
const adminService = new AdminService()

router.get('/best-clients', async (req, res) => {
    const { start, end, limit } = req.query
    try {
        if (!start || !end) {
            throw new Error(`startDate and endDate must be specified`)
        }

        if (!limit) {
            limit = 2
        }

        const clients = await adminService.getBestClients(start, end, limit)
        res.send(clients)
    } catch (err) {
        res.status(400).json({ error: err.message }).end()
    }
})

module.exports = router