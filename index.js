const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

// Importing routers
const userRoute = require('./routes/user')

// Importing respective environment variables
const config = require('./config');

const app = express()

// Preprocessing middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes middleware
app.get('/', (req, res, next) => {
    try {
        res.json({
            success: true
        })
    }
    catch (err) {
        next(err)
    }
})

app.use('/user', userRoute)

// Error handling middleware
app.use((error, req, res, next) => {
    console.log(error)
    res.json({
        success: false,
        error: error.message,
    })
})

// Connecting to database and then starting server
mongoose.connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database')
        app.listen(config.port, () => console.log('Server Started', config.port))
    }).catch(err => {
        console.log('Failed to start server')
        console.log(err)
    })