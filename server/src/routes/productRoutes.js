import { Router } from 'express'
import { getAllProducts, getProductById, createProduct } from '../controllers/productController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = Router()

router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', authenticateToken, createProduct)

export default router
