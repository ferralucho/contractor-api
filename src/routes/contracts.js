const express = require('express')
const router = express.Router()
const ContractService = require('../services/contracts')
const { Contract } = require('../models/model')

const contractService = new ContractService(Contract)

router.get('/', async (req, res) => {
  const profile = req.profile
  try {
    const contracts = await contractService.getAllByUser(profile.id)
    res.send(contracts)
  } catch (err) {
    res.status(400).json({ error: err.message }).end()
  }
})

router.get('/:id', async (req, res) => {
  const profile = req.profile
  const { id } = req.params
  try {
    const contract = await contractService.getById(id, profile.id)
    if (!contract) return res.status(404).json().end()

    res.send(contract)
  } catch (err) {
    res.status(400).json({ error: err.message }).end()
  }
})

module.exports = router
