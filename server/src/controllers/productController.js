import prisma from '../db.js'

export const getAllProducts = async (req, res) => {
  try {
    const { badge, search } = req.query
    const where = {
      inStock: true,
      ...(badge && { badge: badge.toUpperCase() }),
      ...(search && {
        OR: [
          { name: { contains: search } },
          { spec: { contains: search } }
        ]
      })
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { id: 'asc' }
    })

    res.json({ products })
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({ message: 'Failed to fetch products' })
  }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const numericId = parseInt(id, 10)

    const product = isNaN(numericId)
      ? await prisma.product.findUnique({ where: { slug: id } })
      : await prisma.product.findUnique({ where: { id: numericId } })

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json({ product })
  } catch (error) {
    console.error('Get product error:', error)
    res.status(500).json({ message: 'Failed to fetch product details' })
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, badge, spec, price, image, slug, category, description } = req.body

    if (!name || !badge || !price) {
      return res.status(400).json({ message: 'Name, badge, and price are required' })
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    const product = await prisma.product.create({
      data: {
        name,
        badge: badge.toUpperCase(),
        spec: spec || '',
        price,
        image: image || '',
        slug: generatedSlug,
        category: category || null,
        description: description || null
      }
    })

    res.status(201).json({ message: 'Product created successfully', product })
  } catch (error) {
    console.error('Create product error:', error)
    res.status(500).json({ message: 'Failed to create product' })
  }
}
