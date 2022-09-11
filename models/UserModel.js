const mongoos = require('mongoose');
const Schema = mongoos.Schema;

const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
}, { timestamps: true });

const User = mongoos.model('User', userSchema);
module.exports = User;