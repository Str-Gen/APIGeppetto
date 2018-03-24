import httpStatus from 'http-status'
import passport from 'passport'
import APIError from '../helpers/APIError'

export default class BaseAuthController {
  constructor(model) {
    this.model = model
    this.modelName = model.modelName.toLowerCase()
  }
  /**
     * Returns passport login response (cookie) when valid username and password is provided
     * @param req
     * @param res
     * @returns {*}
     */
  login = (req, res) => {
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
        const error = new APIError('Authentication error', httpStatus.UNAUTHORIZED)
        next(error)
      }

      console.log(err)
      console.log(user)

      passport.authenticate('local')(req, res, () => {
        console.log(req)
        console.log(user)
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
    if (!req.user) {
      const error = new APIError('Authentication error', httpStatus.UNAUTHORIZED)
      next(error)
    }

    next()
  }
}
