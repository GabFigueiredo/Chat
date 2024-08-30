const mongodb = require('../model/authModel')

module.exports = async (req, res) => {
    
    try {
        const response = await mongodb.find({ username: { $ne: req.user.username } })
        res.status(200).json({
            message: "Busca de usuários feita com sucesso!",
            data: response,
            success: true
        })
    } catch (error) {
        console.log("Deu erro ao buscar usuários")
        res.status(400).json({
            message: "Erro ao buscar usuários no banco de dados",
            error: error
        })
    }
}