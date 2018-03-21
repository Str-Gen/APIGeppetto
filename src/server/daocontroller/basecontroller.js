import express from 'express'
import pluralize from 'pluralize'
import { ok, fail } from './utils'

const MAX_RESULTS = 100
const router = express.Router()

export default class BaseController {
  constructor(model, key) {
    this.model = model
    this.modelName = model.modelName.toLowerCase()
    this.key = key
  }

  create(data) {
    return this.model.create(data).then(modelInstance => {
      var response = {}
      response[this.modelName] = modelInstance
      return response
    })
  }

  read(id) {
    var filter = {}
    filter[this.key] = id

    return this.model.findOne(filter).then(modelInstance => {
      var response = {}
      response[this.modelName] = modelInstance
      return response
    })
  }

  update(id, data) {
    var filter = {}
    filter[this.key] = id

    return this.model
      .findOne(filter)
      .then(modelInstance => {
        for (var attribute in data) {
          if (data.hasOwnProperty(attribute) && attribute !== this.key && attribute !== '_id') {
            modelInstance[attribute] = data[attribute]
          }
        }
        return modelInstance.save()
      })
      .then(modelInstance => {
        var response = {}
        response[this.modelName] = modelInstance
        return response
      })
  }

  delete(id) {
    const filter = {}
    filter[this.key] = id
    return this.model.remove(filter).then(() => {
      return {}
    })
  }

  list() {
    return this.model.find({}).limit(MAX_RESULTS).then(modelInstances => {
      var response = {}
      response[pluralize(this.modelName)] = modelInstances
      return response
    })
  }

  route() {
    router.get('/', (req, res) => {
      this.list().then(ok(res)).then(null, fail(res))
    })

    router.post('/', (req, res) => {
      this.create(req.body).then(ok(res)).then(null, fail(res))
    })

    router.get('/:key', (req, res) => {
      this.read(req.params.key).then(ok(res)).then(null, fail(res))
    })

    router.put('/:key', (req, res) => {
      this.update(req.params.key, req.body).then(ok(res)).then(null, fail(res))
    })

    router.delete('/:key', (req, res) => {
      this.delete(req.params.key).then(ok(res)).then(null, fail(res))
    })

    return router
  }
}
