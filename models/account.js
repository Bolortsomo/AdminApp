var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema ({
    username: String,
    name: String,
    password: String
});

Account
.virtual('url')
.get(function() {
    return '/profile/user/' + this_id;
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);