const sequelize = require('../config/sequelize')

class AdminService {
  constructor() {}

  async getBestProfessions(startDate, endDate) {
    try {
      const results = await sequelize.query(
        `SELECT p.profession
                    FROM jobs j 
                    JOIN Contracts c on j.contractId = c.id
                    JOIN Profiles p on c.clientId = p.id
                    WHERE j.paid=true
                    AND j.paymentDate BETWEEN :startDate AND :endDate
                    GROUP BY c.contractorId
                    ORDER BY SUM(j.price) desc
                    LIMIT 1`,
        {
          replacements: { startDate, endDate },
          type: sequelize.QueryTypes.SELECT,
        }
      )
      return results
    } catch (err) {
      throw new Error(err)
    }
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
          type: sequelize.QueryTypes.SELECT,
        }
      )

      return results
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = AdminService
