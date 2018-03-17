var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Supervisor = new Schema({
    _supervisor_id: { type: Schema.Types.ObjectId },
    firstname: { type: String },
    lastname: { type: String },
    current_event: Schema.Types.ObjectId,
    registered_events: [Schema.Types.ObjectId],
    telephone: { type: String },
    principal_focus: { type: String },
    teammembers: {type: [Schema.Types.ObjectId] },
    created_at: { type: Date, required: false, default: Date.now }
});

Supervisor.plugin(passportLocalMongoose);

module.exports = mongoose.model('Supervisor', Supervisor);