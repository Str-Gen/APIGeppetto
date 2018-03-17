var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkerStatus = new Schema({
    _worker_id: { type: Schema.Types.ObjectId },
    skillset: { type: Schema.Types.Mixed },
    available: { type: Schema.Types.Boolean }   
});

module.exports = mongoose.model('Workerstatus',WorkerStatus);