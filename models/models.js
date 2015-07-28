var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    rank: {type: String, default: 'user'},
    created_at: {type: Date, default: Date.now}
})

mongoose.model('User', userSchema);
