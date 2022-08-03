const jwt = require('jsonwebtoken');
const { jwt_secret } = require('./../config')
const User = require('./../models/user')

exports.isAuth = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')
        if (!authHeader)
            throw new Error('Not authenticated.')
        const token = authHeader.split(' ')[1]
        const decodedToken = jwt.verify(token, jwt_secret)
        if (!decodedToken)
            throw new Error('Not authenticated.')
        const userEntry = await User.findById(decodedToken.userId)
        if (!userEntry)
            throw new Error('Not authenticated.')
        req.userId = userEntry._id.toString()
        next()
    } catch (error) {
        next(error)
    }
}
