import { Router } from 'express'
import { submitInquiry, getAllInquiries } from '../controllers/contactController.js'
import { optionalAuth, authenticateToken } from '../middleware/auth.js'

const router = Router()

router.post('/', optionalAuth, submitInquiry)
router.get('/', authenticateToken, getAllInquiries)

export default router
