import APIError from '../helpers/APIError'
import httpStatus from 'http-status'

export default class BaseController {
  constructor(model, key) {
    this.model = model
    this.modelName = model.modelName.toLowerCase()
    this.key = key
  }

  create(req, res, next) {
    return this.model
      .create(req.body)
      .then(modelInstance => {
        if (modelInstance) {
          var response = {}
          response[this.modelName] = modelInstance
          return response
        }
        const err = new APIError('No such ' + this.modelName + ' exists!', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
      .then(resp => {
        res.json(resp)
      })
      .catch(e => next(e))
  }
}
