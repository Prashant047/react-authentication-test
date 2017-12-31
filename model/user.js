const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    notes: [{
        title: {type: String, default: ''},
        body: {type: String, default: ''}
    }]
},{collection:"user"});


const User = mongoose.model('user', userSchema);
module.exports = User;