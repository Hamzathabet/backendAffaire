const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    role: {
        type: String
    }
});

module.exports = mongoose.model('User', User);