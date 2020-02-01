const request = require('supertest')
const server = require('../../../api/server')
const db = require('../../config/dbConfig')

beforeEach(async () => {
    await db.seed.run()
})

describe('projects router tests', () => {

    test('get all projects for a user', async () => {
        jest.setTimeout(10000)
        const res = await request(server).get('/api/users/1/projects')
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
    })

})