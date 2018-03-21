import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

var WorkerSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  firstname: { type: String },
  lastname: { type: String },
  current_event: mongoose.Schema.Types.ObjectId,
  registered_events: [mongoose.Schema.Types.ObjectId],
  skillset: { type: mongoose.Schema.Types.Mixed },
  telephone: { type: String },
  created_at: { type: Date, default: Date.now },
})

WorkerSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

export default mongoose.model('Worker', WorkerSchema)
