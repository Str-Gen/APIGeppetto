var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SiteTypes = require('./site')

var Task = new Schema({
    _task_id: {type: Schema.Types.ObjectId},
    task_name: {type: String},
    started_at: {type: Date},
    finished_at: {type: Date},
    worker_estimate: {type: Number},
    time_estimate: {type: String},
    worker_real: {type: Number},
    time_real: {type: String},
    supervisor_id: {type: Schema.Types.ObjectId},
    location: {type: SubSite}
});

var TaskModel = mongoose.model('Task',Task);

var LiveEvent = new Schema({
    _event_id: {type: Schema.Types.ObjectId},
    event_name: {type: String},
    task_collection: {type: [Task]},
    location: {type: Site}
});

module.exports = mongoose.model('Eventi',LiveEvent);