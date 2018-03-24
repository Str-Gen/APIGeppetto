import BaseAuthController from './baseauth.controller'
import User from '../models/user.model'

export default class UserAuthController extends BaseAuthController {
  constructor() {
    super(User)
  }
}
