const express = require('express')
const router = express.Router()
const JobsService = require('../services/jobs')
const { Job, Contract } = require('../models/model')

const jobService = new JobsService(Job, Contract)

router.get('/unpaid', async (req, res) => {
    const profile = req.profile
    try {
        const jobs = await jobService.getAllUnpaidByUser(profile.id)
        res.send(jobs)
    } catch (err) {
        res.status(400).json({ error: err.message }).end()
    }
})


module.exports = router