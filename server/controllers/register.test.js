const request = require('supertest')
const {app, connectToDatabase} = require('../index')
const mongoose = require('mongoose')
const mongodb = require('../model/authModel')

const newUser = {
    email: "test@test.com",
    username:  "username",
    password: "password"
}

const sameEmail = {
    email: "test@test.com",
    username:  "notUsername",
    password: "password"
}

const sameUsername = {
    email: "notTest@test.com",
    username:  "username",
    password: "password"
}

describe('Register Tests', () => {
    it('Should create a new user',  async () => {
        const response = await request(app)
            .post('/register')
            .send(newUser)
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200)
        const hashPassword = response.body.user.password
        expect(response.body).toEqual({
            message: "Item adicionado com sucesso",
            user: {
                email: 'test@test.com',
                username: 'username',
                password: hashPassword
            } 
        })
    })

    it('Should report email error', async() => {
        const response = await request(app)
            .post('/register')
            .send(sameEmail)
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200)
        expect(response.body).toEqual({
            message: "Email já se encontra cadastrado",
            user: null
        })
    })

    it('Should report username error', async() => {
        const response = await request(app)
            .post('/register')
            .send(sameUsername)
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200)
        expect(response.body).toEqual({
            message: "Nome de usuário já se encontra cadastrado",
            user: null
        })
    })

    beforeAll(async () => {
        connectToDatabase()
    })

    afterAll(async () => {
        await mongodb.deleteOne({email: newUser.email})
        await mongoose.disconnect()
    })
})