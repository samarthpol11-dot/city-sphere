import jwt from 'jsonwebtoken'
import prisma from '../db.js'

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' })
  }

  try {
    const secret = process.env.JWT_SECRET || 'city_sphere_super_secret_jwt_key_2026'
    const decoded = jwt.verify(token, secret)
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, role: true, company: true, phone: true }
    })

    if (!user) {
      return res.status(401).json({ message: 'User not found or session invalid' })
    }

    req.user = user
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}

export const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return next()
  }

  try {
    const secret = process.env.JWT_SECRET || 'city_sphere_super_secret_jwt_key_2026'
    const decoded = jwt.verify(token, secret)
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, role: true, company: true, phone: true }
    })
    if (user) {
      req.user = user
    }
  } catch {
    // Ignore invalid token for optional auth
  }
  next()
}
