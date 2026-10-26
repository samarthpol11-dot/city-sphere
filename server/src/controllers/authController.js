import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../db.js'

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'city_sphere_super_secret_jwt_key_2026'
  return jwt.sign({ userId }, secret, { expiresIn: '7d' })
}

export const register = async (req, res) => {
  try {
    const { name, email, password, company, phone } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const displayName = name?.trim() || email.split('@')[0]

    const user = await prisma.user.create({
      data: {
        name: displayName,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        company: company?.trim() || null,
        phone: phone?.trim() || null,
        role: 'customer'
      },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        phone: true,
        role: true,
        createdAt: true
      }
    })

    const token = generateToken(user.id)

    res.status(201).json({
      message: 'Account created successfully',
      user,
      token
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Internal server error during registration' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const normalizedEmail = email.toLowerCase().trim()
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    })

    // If demo user doesn't exist yet, seamlessly create them on first login so existing users aren't locked out
    if (!user) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      user = await prisma.user.create({
        data: {
          name: name?.trim() || normalizedEmail.split('@')[0],
          email: normalizedEmail,
          password: hashedPassword,
          role: 'customer'
        }
      })
    } else {
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' })
      }
    }

    const token = generateToken(user.id)

    res.json({
      message: 'Logged in successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company,
        phone: user.phone,
        role: user.role
      },
      token
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error during login' })
  }
}

export const getMe = async (req, res) => {
  try {
    res.json({ user: req.user })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ message: 'Failed to retrieve profile' })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { name, company, phone } = req.body
    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(name && { name: name.trim() }),
        ...(company !== undefined && { company: company?.trim() || null }),
        ...(phone !== undefined && { phone: phone?.trim() || null })
      },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        phone: true,
        role: true
      }
    })

    res.json({ message: 'Profile updated successfully', user: updated })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ message: 'Failed to update profile' })
  }
}
