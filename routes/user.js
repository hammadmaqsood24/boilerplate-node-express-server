const express = require('express')
const router = express.Router()
const { postUserRegister, postUserLogin, validate } = require('../controller/user')

router.post('/register', validate('postUserRegister'), postUserRegister)
router.post('/login', validate('postUserLogin'), postUserLogin)

module.exports = router