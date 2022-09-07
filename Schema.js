const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title : String,
    description : String,
    status : String,
    userName : String
})

module.exports = bookSchema;