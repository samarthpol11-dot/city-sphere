import prisma from '../db.js'

export const createOrder = async (req, res) => {
  try {
    const { items, customerName, customerEmail, customerPhone, company, notes } = req.body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Cart items are required' })
    }

    const email = customerEmail || (req.user ? req.user.email : null)
    const name = customerName || (req.user ? req.user.name : null)

    if (!email || !name) {
      return res.status(400).json({ message: 'Customer name and email are required' })
    }

    // Calculate total amount
    const totalAmount = items.reduce((sum, item) => {
      const numeric = parseFloat(String(item.price).replace(/[^0-9.]/g, ''))
      const qty = parseInt(item.qty || item.quantity || 1, 10)
      return sum + (isNaN(numeric) ? 0 : numeric * qty)
    }, 0)

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const orderNumber = `CS-${dateStr}-${randomSuffix}`

    const newOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          orderNumber,
          userId: req.user ? req.user.id : null,
          customerName: name,
          customerEmail: email,
          customerPhone: customerPhone || (req.user ? req.user.phone : null),
          company: company || (req.user ? req.user.company : null),
          status: 'pending',
          totalAmount,
          notes: notes || null,
          items: {
            create: items.map((i) => ({
              productName: i.name,
              badge: i.badge || 'TBR',
              price: String(i.price),
              quantity: parseInt(i.qty || i.quantity || 1, 10),
              productId: typeof i.id === 'number' ? i.id : null
            }))
          }
        },
        include: {
          items: true
        }
      })
      return order
    })

    res.status(201).json({
      message: 'Quote request submitted successfully',
      order: newOrder
    })
  } catch (error) {
    console.error('Create order error:', error)
    res.status(500).json({ message: 'Failed to submit quote request' })
  }
}

export const getUserOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          { userId: req.user.id },
          { customerEmail: req.user.email }
        ]
      },
      include: {
        items: true
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json({ orders })
  } catch (error) {
    console.error('Get user orders error:', error)
    res.status(500).json({ message: 'Failed to retrieve orders' })
  }
}

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params
    const numericId = parseInt(id, 10)

    const order = isNaN(numericId)
      ? await prisma.order.findUnique({
          where: { orderNumber: id },
          include: { items: true }
        })
      : await prisma.order.findUnique({
          where: { id: numericId },
          include: { items: true }
        })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Permission check if private
    if (req.user && req.user.role !== 'admin' && order.userId && order.userId !== req.user.id && order.customerEmail !== req.user.email) {
      return res.status(403).json({ message: 'Access denied' })
    }

    res.json({ order })
  } catch (error) {
    console.error('Get order error:', error)
    res.status(500).json({ message: 'Failed to fetch order details' })
  }
}
