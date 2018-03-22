import BaseController from './base.controller'
import { SubsiteModel } from '../models/site.model'

export default class SubsiteController extends BaseController {
  constructor() {
    super(SubsiteModel, 'subsite_name')
  }
}
