const request = require('supertest')
const config = require('../../../src/config')
const app = require('../../../src/app')
const sequelize = require('../../../src/config/sequelize')

const API_ADMIN = `${config.API_BASE}/admin`
let PROFILE_ID = '8';

afterAll(async () => {
  await sequelize.close()
})

describe('Test the admin path', () => {
  test('It should get unpaid admin', async () => {
    const response = await request(app)
      .get(API_ADMIN + '/unpaid')
      .send()
      .set('profile_id', PROFILE_ID);
    expect(response.statusCode).toBe(200)
  })
})
