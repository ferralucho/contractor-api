const { Op } = require("sequelize");
const sequelize = require('../config/sequelize');

class BalanceService {
  constructor(Job, Contract, Profile, JobService) {
    this.job = Job
    this.contract = Contract
    this.profile = Profile
    this.jobService = JobService
  }

  async depositToUser(debitProfileId, receiverProfileId, depositAmount) {
    try {
      const jobs = await this.jobService.getAllUnpaidByUser(debitProfileId)

      const amount = jobs.length > 0 ? jobs.map(job => job.price).reduce((a1, a2) => a1 + a2, 0) : 0
      if (amount > 0 && depositAmount > (amount / 4)) {
        throw new Error(`Client can not deposit more than 25% total of jobs to pay`)
      }
      const t = await sequelize.transaction()
      try {
        const debitProfile = await this.profile.findByPk(debitProfileId)

        if (debitProfile.balance > 0 && debitProfile.balance >= depositAmount) {
          throw new Error(`Client can not deposit more than it has in the balance`)
        }
        debitProfile.balance -= depositAmount
        const receiverProfile = await this.profile.findByPk(receiverProfileId)
        receiverProfile.balance += depositAmount
        await receiverProfile.save({ transaction: t })
        await debitProfile.save({ transaction: t })
        await t.commit()
        return tr
      } catch (e) {
        await t.rollback()
        throw new Error(err)
      }
    } catch (err) {
      throw new Error(err)
    }
  }

}

module.exports = BalanceService
