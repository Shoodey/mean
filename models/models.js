var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    rank: {type: String, default: 'user'},
    created_at: {type: Date, default: Date.now}
});

var itemSchema = new mongoose.Schema({
    name: String,
    content: String,
    online: {type: Boolean, default: false},
    created_by: String,
    created_at: {type: Date, default: Date.now}
});

mongoose.model('User', userSchema);
mongoose.model('Item', itemSchema);
