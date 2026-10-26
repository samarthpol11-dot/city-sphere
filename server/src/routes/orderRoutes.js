import { Router } from 'express'
import { createOrder, getUserOrders, getOrderById } from '../controllers/orderController.js'
import { authenticateToken, optionalAuth } from '../middleware/auth.js'

const router = Router()

router.post('/', optionalAuth, createOrder)
router.get('/my-orders', authenticateToken, getUserOrders)
router.get('/:id', optionalAuth, getOrderById)

export default router
