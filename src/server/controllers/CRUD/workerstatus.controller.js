import BaseController from '../base.controller'
import { WorkerStatusModel } from '../../models/workerstatus.model'

export default class WorkerStatusController extends BaseController {
  constructor() {
    super(WorkerStatusModel, 'worker_id')
  }
}
