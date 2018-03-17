var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Worker = new Schema({
    _worker_id: { type: Schema.Types.ObjectId },
    firstname: { type: String },
    lastname: { type: String },
    current_event: Schema.Types.ObjectId,
    registered_events: [Schema.Types.ObjectId],
    skillset: { type: Schema.Types.Mixed },
    telephone: { type: String },
    created_at: { type: Date, required: false, default: Date.now }
});

Worker.plugin(passportLocalMongoose);

module.exports = mongoose.model('Worker', Worker);