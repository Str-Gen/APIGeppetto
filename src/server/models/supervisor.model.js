import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

var SupervisorSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  current_event: mongoose.Schema.Types.ObjectId,
  registered_events: [mongoose.Schema.Types.ObjectId],
  telephone: { type: String },
  principal_focus: { type: String },
  teammembers: { type: [mongoose.Schema.Types.ObjectId] },
  created_at: { type: Date, required: false, default: Date.now },
})

SupervisorSchema.plugin(passportLocalMongoose)

export default mongoose.model('Supervisor', SupervisorSchema)
