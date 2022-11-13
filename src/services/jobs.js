const { Op } = require('sequelize')
const sequelize = require('../config/sequelize')

class JobService {
  constructor(Job, Contract, Profile) {
    this.job = Job
    this.contract = Contract
    this.profile = Profile
  }

  async getAllUnpaidByUser(profileId) {
    const where = {
      status: 'in_progress',
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    }

    try {
      const contracts = await this.contract.findAll({
        attributes: ['id'],
        where: where,
      })
      const jobs = await this.job.findAll({
        where: {
          paid: false,
          ContractId: {
            [Op.in]: contracts.map((contract) => contract.id),
          },
        },
      })
      return jobs
    } catch (err) {
      throw new Error(err)
    }
  }

  async payJob(profileId, jobId) {
    try {
      const client = await this.profile.findOne({
        where: {
          id: profileId,
        },
      })

      if (!client) {
        throw new Error(`Client does not exist`)
      }

      const job = await this.job.findOne({
        where: {
          id: jobId,
        },
      })

      if (!job) {
        throw new Error(`Job does not exist`)
      }

      if (job.paid) {
        throw new Error(`Job is paid`)
      }

      const contract = await this.contract.findOne({
        where: {
          id: job.ContractId,
        },
      })

      if (!contract) {
        throw new Error(`Contract does not exist`)
      }

      const jobAmount = job.price
      const contractor = await this.profile.findOne({
        where: {
          id: contract.ContractorId,
        },
      })

      if (!contractor) {
        throw new Error(`Contractor does not exist`)
      }

      const clientBalance = client.balance

      if (clientBalance < jobAmount) {
        throw new Error(`Not enough money to pay`)
      }

      const t = await sequelize.transaction()
      try {
        client.balance = clientBalance - jobAmount
        await client.save({ transaction: t })
        contractor.balance += jobAmount
        await contractor.save({ transaction: t })
        job.paid = true
        await job.save({ transaction: t })
        await t.commit()
      } catch (e) {
        await t.rollback()
      }
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = JobService
