const { Op } = require("sequelize");

class JobService {
    constructor(Job, Contract) {
        this.job = Job
        this.contract = Contract
    }

    async getAllUnpaidByUser(profileId) {
        const where = {
            status: 'in_progress',
            [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }]
        }

        try {
            const contracts = await this.contract.findAll({
                attributes: ['id'],
                where: where
            })
            const jobs = await this.job.findAll({
                where: {
                    paid: false,
                    ContractId: {
                        [Op.in]: contracts.map(contract => contract.id)
                    }
                }
            })
            return jobs
        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = JobService