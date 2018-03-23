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
      .then(createdInstance => {
        if (createdInstance) {
          var response = {}
          response[this.modelName] = createdInstance
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
    // this key in params.key is important, it is called key in subsite.route.js, so don't change that
    filter[this.key] = req.params.key
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

  read = (req, res, next) => {
    const filter = {}
    filter[this.key] = req.params.key
    return this.model
      .findOne(filter)
      .then(foundInstance => {
        if (foundInstance) {
          var response = {}
          response[this.modelName] = foundInstance
          return response
        }
        const err = new APIError('No such ' + this.modelName + ' found based on filter!', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
      .then(resp => {
        res.json(resp)
      })
      .catch(e => next(e))
  }

  update = (req, res, next) => {
    const filter = {}
    filter[this.key] = req.params.key
    return this.model
      .findOne(filter)
      .then(foundInstance => {
        if (foundInstance) {
          const updateProperties = req.body
          for (var attribute in updateProperties) {
            // currently any tried update to the property of the object that is used as key will be silently ignored, this might not be wanted
            if (updateProperties.hasOwnProperty(attribute) && attribute !== this.key && attribute !== '_id') {
              foundInstance[attribute] = updateProperties[attribute]
            }
          }
          return foundInstance.save()
        }
        const err = new APIError('No such ' + this.modelName + 'to update based on filter!', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
      .then(updatedInstance => {
        if (updatedInstance) {
          var response = {}
          response[this.modelName] = updatedInstance
          return response
        }
        const err = new APIError('No such ' + this.modelName + 'updated based on filter!', httpStatus.NOT_FOUND)
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
        const err = new APIError('No ' + pluralize(this.modelName) + ' exist!', httpStatus.NOT_FOUND)
        return Promise.reject(err)
      })
      .then(resp => {
        res.json(resp)
      })
      .catch(e => next(e))
  }
}
