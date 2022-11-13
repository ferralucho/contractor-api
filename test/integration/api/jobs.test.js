/* global beforeAll afterAll describe test expect */
const request = require('supertest')
const config = require('../../../src/config')
const app = require('../../../src/app')
const sequelize  = require('../../../src/config/sequelize')

const API_JOBS = `${config.API_BASE}/jobs`
let PROFILE_ID = '8'

afterAll(async () => {
  await sequelize.close()
})

describe('Test the jobs path', () => {
  test('It should get unpaid jobs', async () => {
    const job = {
      name: 'Contract 2',
      ch: 3020
    }
    const response = await request(app)
      .get(API_JOBS + '/unpaid').send(job)
      .set('profile_id', PROFILE_ID)
    expect(response.statusCode).toBe(200)
  })
})
