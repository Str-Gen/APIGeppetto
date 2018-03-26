import WorkerController from '../../controllers/CRUD/woker.controller'
import express from 'express'

const router = express.Router()
const controller = new WorkerController()

// this listing should not be available later on, because it exposes too much information
router.route('/').get(controller.list)
router.route('/:key').get(controller.read).delete(controller.delete).put(controller.update)

export default router
