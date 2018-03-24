import express from 'express'
import validate from 'express-validation'
import passport from 'passport'
import paramValidation from './auth.validations'
import authCtrl from '../../controllers/auth.controller'
import WorkerAuthController from '../../controllers/worker.auth.controller'
import SupervisorAuthController from '../../controllers/supervisor.auth.controller'

const router = express.Router() // eslint-disable-line new-cap

router.route('/me').get(authCtrl.me)
router.route('/login').post(validate(paramValidation.login), passport.authenticate('local'), authCtrl.login)
router.route('/register').post(validate(paramValidation.register), authCtrl.register)

const wrkrAuthCtrl = new WorkerAuthController()
router.route('/me-worker').get(wrkrAuthCtrl.me)
router.route('/login-worker').post(validate(paramValidation.login), passport.authenticate('local'), wrkrAuthCtrl.login)
router.route('/register-worker').post(validate(paramValidation.register), wrkrAuthCtrl.register)

const sprvAuthCtrl = new SupervisorAuthController()
router.route('/me-supervisor').get(sprvAuthCtrl.me)
router
  .route('/login-supervisor')
  .post(validate(paramValidation.login), passport.authenticate('local'), sprvAuthCtrl.login)
router.route('/register-supervisor').post(validate(paramValidation.register), sprvAuthCtrl.register)

export default router
