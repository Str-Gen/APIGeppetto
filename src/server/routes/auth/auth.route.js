import express from 'express'
import validate from 'express-validation'
import passport from 'passport'
import paramValidation from './auth.validations'
import authCtrl from '../../controllers/auth.controller'
import WorkerAuthController from '../../controllers/workerauth.controller'
import UserAuthController from '../../controllers/userauth.controller'

const router = express.Router() // eslint-disable-line new-cap

router.route('/me').get(authCtrl.me)
router.route('/login').post(validate(paramValidation.login), passport.authenticate('local'), authCtrl.login)
router.route('/register').post(validate(paramValidation.register), authCtrl.register)

const wrkrAuthCtrl = new WorkerAuthController()
router.route('/login-worker').post(validate(paramValidation.login), passport.authenticate('local'), wrkrAuthCtrl.login)
router.route('/register-worker').post(validate(paramValidation.register), wrkrAuthCtrl.register)

const usrAuthCtrl = new UserAuthController()
router.route('/login-user').post(validate(paramValidation.login), passport.authenticate('local'), usrAuthCtrl.login)
router.route('/register-user').post(validate(paramValidation.register), usrAuthCtrl.register)

export default router
