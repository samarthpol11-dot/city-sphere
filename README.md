# City Sphere — Full-Stack React + Node.js + Prisma (SQLite)

A full-stack web application for City Sphere, a commercial tyre retreading company. Built with a React + Vite frontend and a Node.js + Express backend powered by Prisma ORM and SQLite.

---

## Quick Start

### 1. Run the Backend API Server
```bash
npm run server
```
Server starts on `http://localhost:5000` with the SQLite database loaded from `server/prisma/dev.db`.

### 2. Run the Frontend (New Terminal)
```bash
npm run dev
```
Open `http://localhost:5173` in your browser. All `/api` calls are automatically proxied to the backend.

---

## Database & Backend Features

- **Database Engine**: SQLite (Zero configuration, file-based, pre-seeded in `server/prisma/dev.db`).
- **ORM & Migrations**: Prisma ORM v6 with type-safe schema definitions.
- **Authentication**: JWT authentication with `bcryptjs` password hashing.
  - Sign in or create an account with role support (`customer` or `admin`).
- **Products API**:
  - Dynamically loads 12 tyre retread categories from the SQLite database.
  - Fallback resilience: gracefully falls back to local data if the server is offline.
- **Quote Requests & Orders**:
  - Submitting cart checkout creates an official order/quote in the database (`CS-YYYYMMDD-XXXX`).
  - Stores all tyre specifications, quantities, customer details, and approximate subtotal.
  - Optional fallback to open pre-filled email client.
- **Contact Inquiries**:
  - Contact form submissions are saved directly to the `Inquiry` table in SQLite.
- **Visual Database Management**:
  - Run `npm run db:studio` to open the interactive Prisma Studio database viewer in your browser.

---

## Seed Accounts

The database comes pre-seeded with 12 tyre retread products and two test accounts:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@citysphere-tyres.com` | `admin123` |
| **Fleet Customer** | `customer@citysphere.demo` | `demo123` |

*(The login modal also features 1-click autofill buttons for these accounts.)*

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite React frontend dev server (`:5173`) |
| `npm run server` | Starts the Express backend API in watch mode (`:5000`) |
| `npm run server:start` | Runs the Express backend in production mode |
| `npm run build` | Compiles production assets into `dist/` |
| `npm run db:seed` | Seeds initial products and demo users into SQLite |
| `npm run db:push` | Pushes Prisma schema changes to the SQLite database |
| `npm run db:studio` | Launches visual Prisma Studio GUI on `http://localhost:5555` |

---

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new account (`name`, `email`, `password`, `company`, `phone`)
- `POST /api/auth/login` — Sign in and receive a JWT token
- `GET /api/auth/me` — Retrieve current authenticated user profile
- `PUT /api/auth/profile` — Update user profile

### Products (`/api/products`)
- `GET /api/products` — Retrieve all active products (supports `?badge=TBR` and `?search=...`)
- `GET /api/products/:id` — Get product by ID or slug
- `POST /api/products` — Add a new product (Admin)

### Orders & Quotes (`/api/orders`)
- `POST /api/orders` — Submit a new quote request / cart order
- `GET /api/orders/my-orders` — View user order history (authenticated)
- `GET /api/orders/:id` — View specific order details

### Contact Inquiries (`/api/contact`)
- `POST /api/contact` — Submit a fleet inquiry / contact message
- `GET /api/contact` — List all inquiries (Admin)

### Health Check
- `GET /api/health` — API status check

---

## Project Structure

```
city-sphere-react/
├── server/
│   ├── prisma/
│   │   ├── schema.prisma      — Prisma database schema (User, Product, Order, OrderItem, Inquiry)
│   │   └── dev.db             — SQLite database file
│   └── src/
│       ├── controllers/       — authController, productController, orderController, contactController
│       ├── middleware/        — JWT authentication and optional auth middleware
│       ├── routes/            — Express route definitions
│       ├── prisma/seed.js     — Database seeder for products and demo users
│       ├── db.js              — Prisma client singleton
│       └── server.js          — Express server entrypoint (PORT 5000)
├── src/
│   ├── api.js                 — Unified frontend API client (fetch, auth header, token storage)
│   ├── App.jsx                — Page sections (Nav, Hero, Products, Process, Gallery, About, Contact, Footer)
│   ├── Widgets.jsx            — LoginModal (with Sign In/Register), CartDrawer (with real DB submission)
│   ├── store.jsx              — React context: AuthProvider (connected to API), CartProvider, ThemeProvider
│   ├── i18n.jsx               — English, Hindi, Marathi translations
│   └── products.js            — Static product definitions (and seeder source)
├── vite.config.js             — Vite config with `/api` proxy to Express
└── package.json               — Root scripts for frontend and server commands
```
