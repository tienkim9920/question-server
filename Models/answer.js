const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    id_user: String,
    question1: String,
    question2: String,
    question3: String,
    question4: String,
    question5: String,
    question6: String,
    question7: String,
    question8: String,
    question9: String,
    question10: String,

})

const Answer = mongoose.model('Answer', schema, 'answer')

module.exports = Answer