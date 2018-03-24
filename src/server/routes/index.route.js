import express from 'express'
import userRoutes from './user/user.route'
import authRoutes from './auth/auth.route'
import subsiteRoutes from './subsite/subsite.route'
import siteRoutes from './site/site.route'
import taskRoutes from './task/task.route'
import liveeventRoutes from './liveevent/liveevent.route'
import workerstatusRoutes from './workerstatus/workerstatus.route'

const router = express.Router() // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'))

// define api routes
router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/subsites', subsiteRoutes)
router.use('/sites', siteRoutes)
router.use('/tasks', taskRoutes)
router.use('/liveevents', liveeventRoutes)
router.use('/workerstatus', workerstatusRoutes)

export default router
