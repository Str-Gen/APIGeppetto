import BaseController from './base.controller'
import { LiveEventModel } from '../models/event.model'

export default class LiveEventController extends BaseController {
  constructor() {
    super(LiveEventModel, 'event_name')
  }
}
