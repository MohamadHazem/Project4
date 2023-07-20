const jwt = require('jsonwebtoken')
const Admin = require('../models/admin.model')
const responseList = require('../configs/response.config')
require('dotenv').config()

async function authenticateAdmin(req, res, next) {
    const bearerToken = req.headers?.authorization
    if (!bearerToken) {
        return res.status(401).json({message: responseList.MISSING_TOKEN})
    }
    const token = bearerToken.split(' ')[1]
    if (!token) {
        return res.status(401).json({message: responseList.MISSING_TOKEN})
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findById(decodedToken.id)
        req.admin = admin
        req.admin.password = ''
        next()
    } catch (err) {
        if(err instanceof jwt.TokenExpiredError){
            return res.status(401).json({message: responseList.INVALID_TOKEN})
        }
        return res.status(500).json({message: responseList.SOMETHING_WRONG})
    }
}

module.exports = authenticateAdmin