import APIError from '../helpers/APIError'
import httpStatus from 'http-status'
import pluralize from 'pluralize'

const MAX_RESULTS = 100

export default class BaseController {
  constructor(model, key) {
    this.model = model
    this.modelName = model.modelName.toLowerCase()
    this.key = key
  }

  /**
     * syntax like 
     * create(req,res,this) {
     *   console.log(this)
     * }
     * will print 'undefined', that's because this isn't passed into the function if you write it like this
     * The ES6 syntax create = (...) => will pass this !
     */
  create = (req, res, next) => {
    //        console.log("This = " + this)
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

  delete = (req, res, next) => {
    const filter = {}
    filter[this.key] = req.params.key
    console.log(req.params)
    return this.model
      .remove(filter)
      .then(deletedInstance => {
        if (deletedInstance) {
          var response = {}
          response[this.modelName] = deletedInstance
          return response
        }
        const err = new APIError('No such ' + this.modelName + ' deleted based on filter!', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
      .then(resp => {
        res.json(resp)
      })
      .catch(e => next(e))
  }

  list = (req, res, next) => {
    return this.model
      .find({})
      .limit(MAX_RESULTS)
      .then(modelInstances => {
        if (modelInstances) {
          var response = {}
          response[pluralize(this.modelName)] = modelInstances
          return response
        }
        const err = new APIError('No ' + this.modelName + ' exist!', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
      .then(resp => {
        res.json(resp)
      })
      .catch(e => next(e))
  }
}
