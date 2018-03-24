import SiteController from '../../controllers/site.controller'
import express from 'express'

const router = express.Router()
const controller = new SiteController()

router.route('/').get(controller.list).post(controller.create)

router.route('/:key').get(controller.read).delete(controller.delete).put(controller.update)

export default router
