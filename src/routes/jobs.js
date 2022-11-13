const express = require('express')
const router = express.Router()
const JobsService = require('../services/jobs')
const { Job, Contract, Profile } = require('../models/model')

const jobService = new JobsService(Job, Contract, Profile)

router.get('/unpaid', async (req, res) => {
  const profile = req.profile
  try {
    const jobs = await jobService.getAllUnpaidByUser(profile.id)
    res.send(jobs)
  } catch (err) {
    res.status(400).json({ error: err.message }).end()
  }
})

router.post('/:id/pay', async (req, res) => {
  const profile = req.profile
  const { id } = req.params
  try {
    const jobs = await jobService.payJob(profile.id, id)
    res.send(jobs)
  } catch (err) {
    res.status(400).json({ error: err.message }).end()
  }
})

module.exports = router
