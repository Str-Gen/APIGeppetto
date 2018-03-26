import BaseController from '../base.controller'
import Supervisor from '../../models/supervisor.model'

export default class SupervisorController extends BaseController {
  constructor() {
    super(Supervisor, 'email')
  }
}
