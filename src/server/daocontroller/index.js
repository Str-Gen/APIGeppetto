import express from 'express'
const router = express.Router()

import {
  SubsiteController,
  SiteController,
  TaskController,
  LiveEventController,
  SupervisorController,
  WorkerController,
  WorkerStatusController,
} from './extendedcontrollers'
export default function() {
  var api = router
  api.use('/subsites', new SubsiteController().route())
  api.use('/sites', new SiteController().route())
  api.use('/tasks', new TaskController().route())
  api.use('/liveevents', new LiveEventController().route())
  api.use('/supervisors', new SupervisorController().route())
  api.use('/workers', new WorkerController().route())
  api.use('/workerstatuses', new WorkerStatusController().route())
  return api
}
