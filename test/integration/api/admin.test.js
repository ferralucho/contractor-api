const request = require('supertest')
const config = require('../../../src/config')
const app = require('../../../src/app')
const sequelize = require('../../../src/config/sequelize')

const API_ADMIN = `${config.API_BASE}/admin`
const PROFILE_ID = '8'

afterAll(async () => {
  await sequelize.close()
})

describe('Test the admin path', () => {
  test('It should get best clients admin without query params', async () => {
    const response = await request(app)
      .get(API_ADMIN + '/best-clients')
      .set('profile_id', PROFILE_ID)
      .send()
    expect(response.statusCode).toBe(400)
  })
})
