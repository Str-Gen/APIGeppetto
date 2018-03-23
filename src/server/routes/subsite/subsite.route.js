import SubsiteController from '../../controllers/subsite.controller'
import express from 'express'

const router = express.Router()
const controller = new SubsiteController()

router.route('/').get(controller.list).post(controller.create)

router.route('/:key').delete(controller.delete)

export default router
