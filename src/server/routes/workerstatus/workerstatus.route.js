import WorkerStatusController from '../../controllers/workerstatus.controller'
import express from 'express'

const router = express.Router()
const controller = new WorkerStatusController()

router.route('/').get(controller.list).post(controller.create)

router.route('/:key').get(controller.read).delete(controller.delete).put(controller.update)

export default router
