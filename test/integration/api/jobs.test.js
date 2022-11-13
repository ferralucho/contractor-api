const request = require('supertest')
const config = require('../../../src/config')
const app = require('../../../src/app')
const sequelize = require('../../../src/config/sequelize')

const API_JOBS = `${config.API_BASE}/jobs`
const PROFILE_ID = '8'

afterAll(async () => {
  await sequelize.close()
})

describe('Test the jobs path', () => {
  test('It should get unpaid jobs', async () => {
    const response = await request(app)
      .get(API_JOBS + '/unpaid')
      .set('profile_id', PROFILE_ID)
    expect(response.statusCode).toBe(200)
  })
})
