import prisma from '../db.js'

export const submitInquiry = async (req, res) => {
  try {
    const { name, email, company, phone, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' })
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        userId: req.user ? req.user.id : null,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        company: company?.trim() || null,
        phone: phone?.trim() || null,
        message: message.trim(),
        status: 'unread'
      }
    })

    res.status(201).json({
      message: 'Inquiry submitted successfully. Our team will contact you shortly.',
      inquiry: {
        id: inquiry.id,
        name: inquiry.name,
        email: inquiry.email,
        createdAt: inquiry.createdAt
      }
    })
  } catch (error) {
    console.error('Contact submit error:', error)
    res.status(500).json({ message: 'Failed to send inquiry. Please try again.' })
  }
}

export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json({ inquiries })
  } catch (error) {
    console.error('Get inquiries error:', error)
    res.status(500).json({ message: 'Failed to fetch inquiries' })
  }
}
