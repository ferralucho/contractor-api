const request = require('supertest')
const app = require('../../../src/app')

describe('Test the API base path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/api')
    expect(response.statusCode).toBe(401)
  })
})
