const request = require('supertest')
const {app, connectToDatabase} = require('../index')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const mongodb = require('../model/messagesModel')

const currentUser = {
    _id: "randomID",
    username: "firstUserTest",
    password: "randomPassword",
    email: "random@gmail.com"
}

const targetUser = {
    _id: "randomID",
    username: "secondUserTest",
    password: "randomPassword",
    email: "random@gmail.com"
}

let mockSessionID

describe("Room session tests", () => {
    it("Should create the session ID", async() => {
        const response = await request(app)
            .post('/chatRoom')
            .send({currentUser, targetUser})
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200);
        expect(response.body.newRoom)
        .not.toBeNull();
        const isMatch = await bcrypt.compare(currentUser.username + targetUser.username, response.body.newRoom);
        expect(isMatch).toBe(true);
    })

    it("Should Report the session ID", async () => {
        const response = await request(app)
            .post('/chatRoom')
            .send({currentUser, targetUser})
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200);
        expect(response.body.existenceRoom)
        .not.toBeNull();
        mockSessionID = response.body.existenceRoom
        const isMatch = await bcrypt.compare(currentUser.username + targetUser.username, response.body.existenceRoom);
        expect(isMatch).toBe(true);
    })

    beforeAll(async () => {
        connectToDatabase()
    })

    afterAll(async () => {
        await mongodb.deleteOne({_id: mockSessionID})
        await mongoose.disconnect()
    })

})