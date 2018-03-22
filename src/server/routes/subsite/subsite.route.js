import SubsiteController from '../../controllers/subsite.controller'
import express from 'express'

const router = express.Router()

router.route('/').get((req, res, next) => {
  res.status(200).send('subsites')
})

router.route('/:subsiteId').get((req, res, next) => {
  res.status(200).send('subsites')
})

export default router
