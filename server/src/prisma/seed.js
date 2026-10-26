import bcrypt from 'bcryptjs'
import prisma from '../db.js'
import PRODUCTS from '../../../src/products.js'

async function main() {
  console.log('[City Sphere Seed] Starting database seed...')

  // 1. Seed Admin User
  const adminSalt = await bcrypt.genSalt(10)
  const adminPassword = await bcrypt.hash('admin123', adminSalt)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@citysphere-tyres.com' },
    update: {},
    create: {
      name: 'City Sphere Admin',
      email: 'admin@citysphere-tyres.com',
      password: adminPassword,
      role: 'admin',
      company: 'City Sphere Tyres'
    }
  })
  console.log(`[City Sphere Seed] Admin user ready: ${admin.email}`)

  // 2. Seed Demo User
  const demoSalt = await bcrypt.genSalt(10)
  const demoPassword = await bcrypt.hash('demo123', demoSalt)

  const demoUser = await prisma.user.upsert({
    where: { email: 'customer@citysphere.demo' },
    update: {},
    create: {
      name: 'Demo Fleet Manager',
      email: 'customer@citysphere.demo',
      password: demoPassword,
      role: 'customer',
      company: 'Apex Logistics'
    }
  })
  console.log(`[City Sphere Seed] Demo user ready: ${demoUser.email}`)

  // 3. Seed Products from products.js
  console.log(`[City Sphere Seed] Seeding ${PRODUCTS.length} tyre products...`)
  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i]
    const slug = p.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + `-${i + 1}`

    await prisma.product.upsert({
      where: { slug },
      update: {
        name: p.name,
        badge: p.badge,
        spec: p.spec,
        price: p.price,
        image: p.Img
      },
      create: {
        slug,
        name: p.name,
        badge: p.badge,
        spec: p.spec,
        price: p.price,
        image: p.Img,
        inStock: true
      }
    })
  }

  const count = await prisma.product.count()
  console.log(`[City Sphere Seed] Total products in database: ${count}`)
  console.log('[City Sphere Seed] Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('[City Sphere Seed] Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
