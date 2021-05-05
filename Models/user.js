const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    name: String,
    answer_true: Number

})

const User = mongoose.model('User', schema, 'user')

module.exports = User