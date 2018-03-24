import BaseController from './base.controller'
import { TaskModel } from '../models/event.model'

export default class TaskController extends BaseController {
  constructor() {
    super(TaskModel, 'task_name')
  }
}
