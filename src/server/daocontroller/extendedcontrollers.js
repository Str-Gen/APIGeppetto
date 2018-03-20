import BaseController from './basecontroller'
import { SubsiteModel, SiteModel } from '../models/site.model'
import { TaskModel, LiveEventModel } from '../models/event.model'
import Supervisor from '../models/supervisor.model'
import Worker from '../models/worker.model'
import WorkerStatus from '../models/workerstatus.model'

export class SubsiteController extends BaseController {
  constructor() {
    super(SubsiteModel, '_id')
  }
}

export class SiteController extends BaseController {
  constructor() {
    super(SiteModel, '_id')
  }
}

export class TaskController extends BaseController {
  constructor() {
    super(TaskModel, '_id')
  }
}

export class LiveEventController extends BaseController {
  constructor() {
    super(LiveEventModel, '_id')
  }
}

export class SupervisorController extends BaseController {
  constructor() {
    super(Supervisor, '_id')
  }
}

export class WorkerController extends BaseController {
  constructor() {
    super(Worker, '_id')
  }
}

export class WorkerStatusController extends BaseController {
  constructor() {
    super(WorkerStatus, '_worker_id')
  }
}
