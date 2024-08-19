const mongodb = require('../model/messagesModel')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {
    const currentUser = req.body.currentUser
    const targetUser = req.body.targetUser

    // Search if those users have an roomID/messages
    try {
        alreadyHasRoom = await mongodb.findOne({
            participants: { $all: [currentUser.username, targetUser.username] }
        });
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao procurar Room no banco de dados",
            error: error
        });
    }

    if (alreadyHasRoom) {
        return res.status(200).json({
            existenceRoom: alreadyHasRoom._id
        });
    } else {
        const roomID = await bcrypt.hash(currentUser.username + targetUser.username, 10)
        try {
            const newRoom = new mongodb({
                _id: roomID,
                participants: [currentUser.username, targetUser.username],
                messages: [],
                createdAt: new Date(),
                updatedAt: new Date()
            })
            await newRoom.save()
            res.status(200).json({
                newRoom: roomID
            })
        } catch (error) {
            res.status(400).json({
                message: "Erro ao criar novo Room no banco de dados",
                error: error
            })
        }
        // Lógica pra continuar semelhante ao IF
    }
}
