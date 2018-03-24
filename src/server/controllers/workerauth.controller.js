import BaseAuthController from './baseauth.controller'
import Wrkr from '../models/worker.model'

export default class WorkerAuthController extends BaseAuthController {
  constructor() {
    super(Wrkr)
  }
}
