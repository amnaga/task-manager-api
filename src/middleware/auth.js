const jwt = require("jsonwebtoken")
const User = require('../models/user') 

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, process.env.JWT_AUTH_SCRETEKEY)
        // const user = User.findOne({_id:decode._id})
        const user = await User.findOne({_id:decode._id,token : token})
        if(!user){
            throw new Error()
        }
        req.user = user
        next()
    } catch(e) {
        res.send(e)
        res.status(401).send({error:'You are not authorized'})
    }
}

module.exports = auth