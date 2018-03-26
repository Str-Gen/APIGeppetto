import BaseController from '../base.controller'
import Wrkr from '../../models/worker.model'

export default class WorkerController extends BaseController {
  constructor() {
    super(Wrkr, 'email')
  }
}
