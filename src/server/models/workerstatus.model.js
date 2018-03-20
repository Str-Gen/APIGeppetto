import mongoose from 'mongoose'

const WorkerStatus = new mongoose.Schema({
  _worker_id: { type: mongoose.Schema.Types.ObjectId },
  skillset: { type: Schema.Types.Mixed },
  available: { type: Schema.Types.Boolean },
})

export default mongoose.model('WorkerStatus', WorkerStatusModel)
