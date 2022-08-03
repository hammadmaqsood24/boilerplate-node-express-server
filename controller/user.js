const User = require('../models/user')
const bcrypt = require('bcrypt')
const { bcrypt_salt_rounds, jwt_secret } = require('./../config')
const jwt = require('jsonwebtoken')
const { checkValidationErrors } = require('./../utils/utils')
const { body } = require('express-validator')

exports.postUserRegister = async (req, res, next) => {
    try {
        checkValidationErrors(req)
        const { firstname, lastname, email, password } = req.body
        const isTaken = await User.findOne({ email: email })
        if (isTaken)
            throw new Error('A user with this email already exits')
        const hashedPass = await bcrypt.hash(password, bcrypt_salt_rounds)
        await User.addUser({ firstname, lastname, email, password: hashedPass })
        res.json({
            success: true
        })
    }
    catch (err) {
        next(err)
    }
}

exports.postUserLogin = async (req, res, next) => {
    try {
        checkValidationErrors(req)
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user)
            throw new Error('A user with this email could not be found')
        const userId = user._id.toString()
        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual)
            throw new Error('Wrong password')
        const token = jwt.sign({
            userId: userId
        }, jwt_secret, { expiresIn: '1h' })
        res.json({
            success: true,
            token: token,
            userId: userId
        })
    }
    catch (err) {
        next(err)
    }
}

exports.validate = (method) => {
    switch (method) {
        case 'postUserRegister':
            return [
                body('firstname', 'Enter a valid firstname').exists().trim().notEmpty().isString(),
                body('lastname', 'Enter a valid lastname').exists().trim().notEmpty().isString(),
                body('email', 'Enter a valid email').isEmail().normalizeEmail(),
                body('password', 'Enter a valid password').exists().trim().notEmpty().isString()
            ]
        case 'postUserLogin':
            return [
                body('email', 'Enter a valid email').isEmail().normalizeEmail(),
                body('password', 'Enter a valid email').exists().trim().notEmpty().isString()
            ]
    }
}