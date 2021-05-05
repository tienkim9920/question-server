const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    id_user: {
        type: String,
        ref: 'User'
    },
    total: Number

})

const Score = mongoose.model('Score', schema, 'score')

module.exports = Score