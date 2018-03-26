import SupervisorController from '../../controllers/CRUD/supervisor.controller'
import express from 'express'

const router = express.Router()
const controller = new SupervisorController()

// same remark as in worker.route.js, this feature won't be available later on
router.route('/').get(controller.list)

router.route('/:key').get(controller.read).delete(controller.delete).put(controller.update)

export default router
