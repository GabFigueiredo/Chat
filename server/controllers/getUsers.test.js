const request = require('supertest')
const {app, connectToDatabase} = require('../index')
const mongoose = require('mongoose')
const mongodb = require('../model/messagesModel')
const colors = require('../colors')

describe('Get Users route', () => {
    it('Should return all users', async () => {
        const databaseLength = await mongodb.countDocuments()
        const response = await request(app)
            .get('/getUsers')
            .set('Accept', 'application/json')
        console.log(response.message)
        expect(response.body.data).toBeTruthy()
        expect(response.body.data).toHaveLength(databaseLength)
    })

    beforeAll(async () => {
        connectToDatabase()
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })
})