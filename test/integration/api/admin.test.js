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

  test('It should get best clients', async () => {
    const response = await request(app)
      .get(API_ADMIN + '/best-clients?start=2020-08-14T23:11:26.737Z&end=2020-08-15T19:11:26.737Z&limit=1')
      .set('profile_id', PROFILE_ID)
      .send()
    expect(response.statusCode).toBe(200)
  })

  test('It should get best profesion without query params', async () => {
    const response = await request(app)
      .get(API_ADMIN + '/best-profession')
      .set('profile_id', PROFILE_ID)
      .send()
    expect(response.statusCode).toBe(400)
  })

  test('It should get best profession', async () => {
    const response = await request(app)
      .get(API_ADMIN + '/best-profession?start=2020-08-14T23:11:26.737Z&end=2020-08-15T19:11:26.737Z')
      .set('profile_id', PROFILE_ID)
      .send()
    expect(response.statusCode).toBe(200)
  })
})
