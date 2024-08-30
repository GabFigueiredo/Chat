const mongodb = require('../model/messagesModel')

module.exports = async (req, res) => {
    const newMessage = {
        sender: req.body.sender,
        content: req.body.content,
        data: req.body.data
    }
    try {
        await mongodb.updateOne (
            {_id: req.body.IOSession},
            {$push: { messages: newMessage}}
    )
        res.status(200).send("Mensagem criada com sucesso")
    } catch (error) {
        res.status(421).send("Erro ao criar mensagem")
    }    
}