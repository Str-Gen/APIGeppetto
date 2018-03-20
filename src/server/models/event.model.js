import mongoose from 'mongoose'
import { SiteModel, SubsiteModel } from './site.model'

const Task = new mongoose.Schema({
  task_name: { type: String },
  live_event_id: { type: mongoose.Schema.Types.ObjectId },
  started_at: { type: Date },
  finished_at: { type: Date },
  worker_estimate: { type: Number },
  time_estimate: { type: String },
  worker_real: { type: Number },
  time_real: { type: String },
  supervisor_id: { type: mongoose.Schema.Types.ObjectId },
  location: { type: SiteTypes.SubsiteModel },
})

const TaskModel = mongoose.model('Task', Task)

const LiveEvent = new mongoose.Schema({
  event_name: { type: String },
  task_collection: { type: [Task] },
  location: { type: SiteTypes.SiteModel },
})

const LiveEventModel = mongoose.model('LiveEvent', LiveEvent)

export default { TaskModel, LiveEventModel }
