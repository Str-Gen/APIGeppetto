var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = new Schema({
    sourceWallet: Schema.Types.ObjectId,
    targetWallet: Schema.Types.ObjectId,
    amount: { type: Number, min: 0},
    action: { type: String },
    created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Transaction',Transaction);