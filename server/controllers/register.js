const mongodb = require('../model/authModel')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    const {email, username, password} = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = {
        email: email,
        username: username,
        password: hashedPassword
    }

    // Verifica se já existe um email igual no banco
    if (await mongodb.findOne({email: user.email})) {
        return res.status(200).json({
            message: "Email já se encontra cadastrado",
            user: null
        })
    }
    // Verifica se já existe um nome de usuário igual no banco
    if (await mongodb.findOne({username: user.username})) {
        return res.status(200).json({
            message: "Nome de usuário já se encontra cadastrado",
            user: null
        })
    }
    try {
        // Envia o usuário pro banco
        const newUser = new mongodb(user)
        await newUser.save()

        res.status(200).json({
            message: "Item adicionado com sucesso",
            success: true
        })

    } catch (error) {
        res.status(400).json({
            message: "Erro ao adicionar usuário",
            error: error
        })
    }
}