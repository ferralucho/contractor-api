/* global beforeAll afterAll describe test expect */
const request = require('supertest')
const config = require('../../../src/config')
const app = require('../../../src/app')
const sequelize  = require('../../../src/config/sequelize')

const API_CONTRACTS = `${config.API_BASE}/contracts`
let PROFILE_ID = '6'

afterAll(async () => {
  await sequelize.close()
})

describe('Test the contracts path', () => {
  test('It should get contract by id', async () => {
    const contract = {
      name: 'Contract 2',
      ch: 3020
    }
    const response = await request(app)
      .get(API_CONTRACTS + '/2').send(contract)
      .set('profile_id', PROFILE_ID)
    expect(response.statusCode).toBe(200)
  })

  test('It should get all contracts', async () => {
    const response = await request(app)
      .get(API_CONTRACTS)
      .set('profile_id', PROFILE_ID)
    const contracts = response.body
    expect(response.statusCode).toBe(200)
    expect(contracts.length).toBe(3)
  })
})
