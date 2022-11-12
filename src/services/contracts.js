const {Op} = require("sequelize");

class ContractService {
    constructor(Contract) {
        this.contract = Contract
    }

    async getById(contractId, profileId) {
        try {
            const contractFound = await this.contract.findOne({
                where: {
                    id: contractId
                }
            })

            if (contractFound) {
                const owned = contractFound.ClientId === profileId || contractFound.ContractorId === profileId;

                if (!owned) {
                    throw new Error(`Contract ${contractId} is not for profile ${profileId}`);
                }
            }

            return contractFound
        } catch (err) {
            throw new Error(err)
        }

    }

    async getAllByUser(profileId) {
        const where = {
            status: {
                [Op.notIn]: ['terminated']
            },
            [Op.or]: [{ClientId: profileId}, {ContractorId: profileId}]
        }

        return await this.contract.findAll({
            where
        })
    }
}

module.exports = ContractService