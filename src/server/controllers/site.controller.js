import BaseController from './base.controller'
import { SiteModel } from '../models/site.model'

export default class SiteController extends BaseController {
  constructor() {
    super(SiteModel, 'site_name')
  }
}
