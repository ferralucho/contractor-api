const sequelize = require('../config/sequelize');

class AdminService {
    constructor() {
    }

    async getBestClients(startDate, endDate, limit) {
        try {
            const results = await sequelize.query(
                `SELECT p.firstName, p.lastName, sum(j.price) as total
                    FROM jobs j 
                    JOIN Contracts c on j.contractId = c.id
                    JOIN Profiles p on c.clientId = p.id
                    WHERE j.paid=true
                    AND j.paymentDate BETWEEN :startDate AND :endDate
                    GROUP BY c.clientId
                    ORDER BY total desc
                    LIMIT :limit`,
                {
                    replacements: { startDate, endDate, limit },
                    type: sequelize.QueryTypes.SELECT
                }
            )

            if (results.length > 0) {
                return results
            }
            return `No client results for the the time frame`
        } catch (err) {
            throw new Error(err)
        }
    }
}

module.exports = AdminService