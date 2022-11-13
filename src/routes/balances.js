const express = require('express')
const router = express.Router()
const { Job, Contract, Profile } = require('../models/model')
const BalanceService = require('../services/balances')
const JobService = require('../services/jobs')

const jobService = new JobService(Job, Contract, Profile)
const balanceService = new BalanceService(Job, Contract, Profile, jobService)

router.post('/deposit/:id', async (req, res) => {
  const profile = req.profile
  const { id } = req.params
  const { deposit } = req.body
  try {
    if (deposit <= 0) {
      throw new Error(`Deposit must be greater than 0`)
    }

    await balanceService.depositToUser(profile.id, id, deposit)
    res.send(result)
  } catch (err) {
    res.status(400).json({ error: err.message }).end()
  }
})

module.exports = router
