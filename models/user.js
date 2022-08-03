const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.statics.addUser = async (user) => {
    const newUser = await userModel.create(user)
    return newUser
}

const userModel = model('User', userSchema)

module.exports = userModel