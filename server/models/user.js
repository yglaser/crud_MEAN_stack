const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: String,
    password: String
    //las versiones futuras deberian tener el tipo de usuario
})

module.exports = mongoose.model('user', userSchema,'users')

