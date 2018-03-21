import mongoose from 'mongoose'

const WorkerStatus = new mongoose.Schema({
  _worker_id: { type: mongoose.Schema.Types.ObjectId },
  skillset: { type: Schema.Types.Mixed },
  available: { type: Schema.Types.Boolean },
  created_at: { type: Date, default: Date.now },
})

export default mongoose.model('WorkerStatus', WorkerStatusModel)
