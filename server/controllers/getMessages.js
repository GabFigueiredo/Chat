const mongodb = require('../model/messagesModel')

module.exports = async (req, res) => {
    try {
        const response = await mongodb.findOne({_id: req.params.id})
        res.status(200).send(response)
    } catch (error) {
        res.status(400).json({
            msg: "Erro ao buscar mensagem",
            err: error
        })
    }
}