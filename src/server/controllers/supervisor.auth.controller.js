import BaseAuthController from './base.auth.controller'
import Supervisor from '../models/supervisor.model'

export default class SupervisorAuthController extends BaseAuthController {
  constructor() {
    super(Supervisor)
  }
}
