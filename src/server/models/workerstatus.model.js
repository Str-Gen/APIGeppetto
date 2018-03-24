import mongoose from 'mongoose'

const WorkerStatusSchema = new mongoose.Schema({
  _worker_id: { type: mongoose.Schema.Types.ObjectId },
  skillset: { type: mongoose.Schema.Types.Mixed },
  available: { type: mongoose.Schema.Types.Boolean },
  created_at: { type: Date, default: Date.now },
})

const WorkerStatusModel = mongoose.model('WorkerStatus', WorkerStatusSchema)
export default { WorkerStatusModel }
