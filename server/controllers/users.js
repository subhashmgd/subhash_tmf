const collection_users = require("../mongo/models/collection_users")

const profile = async (req, res, next) => {

    try {

        let user = await collection_users.findById(req.user_id, {password : 0})
        res.send(user)

    } catch {
        res.status(401).send("Internal Error")
        
    }
    
}

module.exports = { profile }
