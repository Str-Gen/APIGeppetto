import httpStatus from 'http-status'
import passport from 'passport'
import APIError from '../helpers/APIError'
import { WorkerStatusModel } from '../models/workerstatus.model'

export default class BaseAuthController {
  constructor(model, strategy) {
    this.model = model
    this.modelName = model.modelName.toLowerCase()
    this.strategy = strategy
  }
  /**
     * Returns passport login response (cookie) when valid username and password is provided
     * @param req
     * @param res
     * @returns {*}
     */
  login = (req, res) => {
    console.log('LOGGED LOGIN REQUEST')
    console.log(req.user)
    return res.json(req.user)
  }

  /**
     * Returns User when succesfully registered
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
  register = (req, res, next) => {
    console.log(req.body)
    this.model.register(new this.model({ email: req.body.email }), req.body.password, (err, user) => {
      if (err) {
        console.log('HIT THE FIRST ERROR ON THE REGISTRATION!')
        const error = new APIError('Authentication error', httpStatus.UNAUTHORIZED)
        next(error)
      }

      console.log('SHOWING err')
      console.log(err)

      console.log('CREATING USER-STATUS IN DB')
      console.log(user.id)

      WorkerStatusModel.create({
        _worker_id: user.id,
        skillset: [],
        available: false,
      })
        .then(createdInstance => {
          console.log(createdInstance)
        })
        .catch(e => {
          console.log(e.messages)
        })

      passport.authenticate(this.strategy)(req, res, () => {
        console.log('HIT THE PASSPORT.AUTHENTICATE')
        console.log(req.body)
        res.json({ user })
      })
    })
  }

  /**
     * Returns User if user session is still open
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
  me = (req, res, next) => {
    console.log('REQ USER !$!')
    console.log(req.user)
    if (!req.user) {
      const error = new APIError('Authentication error', httpStatus.UNAUTHORIZED)
      next(error)
    }

    res.json(req.user)
  }

  /**
     * Middleware to check user is authorised to access endpoint.
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
  checkAuth = (req, res, next) => {
    console.log('Called checkAuth with user', req.user)
    if (!req.user) {
      const error = new APIError('Authentication error', httpStatus.UNAUTHORIZED)
      next(error)
    }

    next()
  }
}
