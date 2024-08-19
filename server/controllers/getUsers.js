const mongodb = require('../model/authModel')

module.exports = async (req, res) => {
    try {
        const response = await mongodb.find()
        res.status(200).json({
            message: "Busca de usuários feita com sucesso!",
            data: response,
            success: true
        })
        console.log("Busca feita com sucesso")
    } catch (error) {
        console.log("Deu erro ao buscar usuários")
        res.status(400).json({
            message: "Erro ao buscar usuários no banco de dados",
            error: error
        })
    }
}