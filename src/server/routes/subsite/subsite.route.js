import SubsiteController from '../../controllers/subsite.controller'
import express from 'express'

const router = express.Router()
const controller = new SubsiteController()

router.route('/').get(controller.list).post(controller.create)

router.route('/:subsiteId').get((req, res, next) => {
  res.status(200).send('subsites')
})

export default router
