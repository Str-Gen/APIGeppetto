var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Wallet = new Schema({    
    _wallet_id: Schema.Types.ObjectId,
    balance: { type: Number},
    transactions_made: {type: Number, min: 0}
});

var models = {};
models.Wallet = mongoose.model('Wallet',Wallet);

var Account = new Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    city: String,
    zip_code: Number,
    address: String,
    telephone: String,
    wallet: Wallet,
    created_at: { type: Date, required: true, default: Date.now }    
});

Account.plugin(passportLocalMongoose);

models.Account = mongoose.model('Account',Account);

module.exports = models;