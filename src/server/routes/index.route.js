import express from 'express'
import authRoutes from './auth/auth.route'
import subsiteRoutes from './subsite/subsite.route'
import siteRoutes from './site/site.route'
import taskRoutes from './task/task.route'
import liveeventRoutes from './liveevent/liveevent.route'
import workerstatusRoutes from './workerstatus/workerstatus.route'
import workerRoutes from './worker/worker.route'
import supervisorRoutes from './supervisor/supervisor.route'

const router = express.Router() // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'))

// define api routes
router.use('/auth', authRoutes)
router.use('/subsites', subsiteRoutes)
router.use('/sites', siteRoutes)
router.use('/tasks', taskRoutes)
router.use('/liveevents', liveeventRoutes)
router.use('/workerstatus', workerstatusRoutes)
router.use('/workers', workerRoutes)
router.use('/supervisors', supervisorRoutes)

export default router
