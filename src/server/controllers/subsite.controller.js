import BaseController from './base.controller'
import { SubsiteModel } from '../models/site.model'
import express from 'express'

const router = express.Router()

export default class SubsiteController extends BaseController {
  constructor() {
    super(SubsiteModel, '_id')
  }

  static route() {
    router.route('/').get((req, res, next) => {
      res.status(200).send('subsites')
    })

    router.route('/:subsiteId').get((req, res, next) => {
      res.status(200).send('subsites')
    })

    return router
  }
}
