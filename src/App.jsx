import { Fragment, useEffect, useRef, useState, useMemo } from 'react'
import PRODUCTS from './products'
import api from './api'
import { useLang } from './i18n'
import { useAuth, useCart, useUI } from './store'
import Calculator from './Calculator'
import {
  LangSwitcher,
  ThemeToggle,
  LoginModal,
  CartDrawer,
  QuickViewModal,
  OrdersModal,
  UserMenuChip,
  ScrollToTop,
  Toast,
  IconCart,
  IconUser,
  IconEye,
  IconCheck,
  IconPlus,
  IconChevronDown
} from './Widgets'

function Svg({ children, viewBox = '0 0 64 64', ...props }) {
  return <svg viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>{children}</svg>
}
function IconTruck(p){return <Svg {...p}><rect x="4" y="22" width="30" height="18" rx="1"/><path d="M34 28h14l8 8v4h-4"/><circle cx="16" cy="44" r="5"/><circle cx="44" cy="44" r="5"/><path d="M11 44h27M49 44h4"/></Svg>}
function IconArrowRight(p){return <Svg viewBox="0 0 24 24" {...p}><path d="M5 12h13M13 6l6 6-6 6"/></Svg>}
function IconPin(p){return <Svg viewBox="0 0 24 24" {...p}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/></Svg>}
function IconPhone(p){return <Svg viewBox="0 0 24 24" {...p}><path d="M6 3h3l2 5-2.5 2A12 12 0 0 0 14 15.5l2-2.5 5 2v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 5a2 2 0 0 1 2-2z"/></Svg>}
function IconMail(p){return <Svg viewBox="0 0 24 24" {...p}><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M4 6.5l8 6 8-6"/></Svg>}
function IconClock(p){return <Svg viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></Svg>}
function IconShield(p){return <Svg viewBox="0 0 24 24" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Svg>}
function IconSearch(p){return <Svg viewBox="0 0 24 24" {...p}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></Svg>}

const SECTION_IDS = ['products', 'calculator', 'process', 'gallery', 'about', 'contact']

/* ============ Nav ============ */
function Nav({ onOpenOrders }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { t } = useLang()
  const { count, setOpen: setCartOpen } = useCart()
  const { setLoginOpen } = useUI()

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', f, { passive: true })
    f()
    return () => window.removeEventListener('scroll', f)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(en => { if (en.isIntersecting) setActive(en.target.id) }),
      { rootMargin: '-30% 0px -50% 0px' }
    )
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const SECTIONS = [
    { id: 'products', label: t('nav.products') },
    { id: 'calculator', label: 'ROI Calculator' },
    { id: 'process', label: t('nav.process') },
    { id: 'gallery', label: t('nav.gallery') },
    { id: 'about', label: t('nav.about') },
    { id: 'contact', label: t('nav.contact') }
  ]

  return (
    <div className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap nav-row">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <svg className="brand-mark" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="17.5" stroke="var(--amber)" strokeWidth="2.2" />
            <circle cx="20" cy="20" r="9.5" stroke="var(--amber)" strokeWidth="2.2" />
            <circle cx="20" cy="20" r="2.4" fill="var(--amber)" />
          </svg>
          <span className="brand-word">CITY <b>SPHERE</b></span>
        </a>

        <div className="nav-right">
          <div className="nav-links">
            {SECTIONS.map(s => (
              <a
                key={s.id}
                href={'#' + s.id}
                className={'nav-link' + (active === s.id ? ' active' : '')}
              >
                {s.label}
                <span className="ul" />
              </a>
            ))}
            <a href="#contact" className="nav-cta">{t('nav.quote')}</a>
          </div>

          <div className="nav-tools">
            <LangSwitcher />
            <ThemeToggle />
            <button
              className="icon-btn cart-btn"
              onClick={() => setCartOpen(true)}
              aria-label={t('nav.cart')}
              title={t('nav.cart')}
            >
              <IconCart />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>

            <UserMenuChip
              onOpenLogin={() => setLoginOpen(true)}
              onOpenOrders={onOpenOrders}
            />
          </div>

          <button
            className={`burger${open ? ' open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
          >
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {SECTIONS.map(s => (
          <a key={s.id} href={'#' + s.id} onClick={() => setOpen(false)}>
            {s.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)} style={{ color: 'var(--amber)', fontWeight: 600 }}>
          {t('nav.quote')}
        </a>
      </div>
    </div>
  )
}

/* ============ Hero ============ */
function HeroEmblem() {
  return (
    <div className="emblem-wrapper">
      <svg className="emblem-ring" viewBox="0 0 400 400" width="100%" style={{ maxWidth: 420 }}>
        <defs>
          <pattern id="tread" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="16" height="16" fill="none" />
            <rect width="8" height="16" fill="var(--surface-2)" />
          </pattern>
        </defs>
        <circle cx="200" cy="200" r="178" fill="var(--bg-2)" stroke="var(--line-strong)" strokeWidth="2" />
        <circle cx="200" cy="200" r="178" fill="url(#tread)" opacity=".45" />
        <circle cx="200" cy="200" r="178" fill="none" stroke="var(--amber)" strokeWidth="2.5" />
        <circle cx="200" cy="200" r="132" fill="var(--bg)" stroke="var(--line-strong)" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="96" fill="none" stroke="var(--line-strong)" />
        <circle cx="200" cy="200" r="32" fill="var(--surface)" stroke="var(--amber)" strokeWidth="2" />
        <text x="200" y="196" textAnchor="middle" fill="var(--amber)" fontSize="12" fontWeight="700" fontFamily="IBM Plex Mono">RENEWED</text>
        <text x="200" y="210" textAnchor="middle" fill="var(--muted-2)" fontSize="9" fontFamily="IBM Plex Mono">CYCLE 01–03</text>
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          const a = (i / 8) * Math.PI * 2
          return (
            <line
              key={i}
              x1={200 + Math.cos(a) * 96}
              y1={200 + Math.sin(a) * 96}
              x2={200 + Math.cos(a) * 132}
              y2={200 + Math.sin(a) * 132}
              stroke="var(--line-strong)"
              strokeWidth="1.5"
            />
          )
        })}
      </svg>
    </div>
  )
}

function Hero() {
  const { t } = useLang()

  return (
    <section id="top" className="hero">
      <div className="hero-grain" />
      <div className="wrap hero-row">
        <div>
          <div className="eyebrow"><span className="dash" />{t('hero.eyebrow')}</div>
          <h1 style={{ marginTop: 18 }}>
            {t('hero.line1')}<br />
            {t('hero.line2')} <span className="accent">{t('hero.accent')}</span>
          </h1>
          <p className="hero-sub">{t('hero.sub')}</p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-solid">{t('hero.ctaQuote')}</a>
            <a href="#calculator" className="btn btn-outline">Calculate Fleet ROI →</a>
          </div>

          <div className="trust-badges">
            <div className="trust-badge-item">
              <IconShield /> <span>IS 15633 Certified</span>
            </div>
            <div className="trust-badge-item">
              <IconCheck /> <span>148°C Hot Cure</span>
            </div>
            <div className="trust-badge-item">
              <IconTruck /> <span>Commercial & Fleet</span>
            </div>
          </div>

          <div className="hero-stats">
            <div className="hstat"><b>{t('hero.stat1v')}</b><span>{t('hero.stat1l')}</span></div>
            <div className="hstat"><b>{t('hero.stat2v')}</b><span>{t('hero.stat2l')}</span></div>
            <div className="hstat"><b>{t('hero.stat3v')}</b><span>{t('hero.stat3l')}</span></div>
          </div>
        </div>

        <div className="hero-emblem">
          <HeroEmblem />
        </div>
      </div>
    </section>
  )
}

/* ============ Products Section ============ */
const CATEGORIES = [
  { id: 'ALL', label: 'All Tyres' },
  { id: 'TBR', label: 'Truck & Bus (TBR)' },
  { id: 'STR', label: 'Steer-Axle (STR)' },
  { id: 'CAR', label: 'Passenger Car' },
  { id: 'COMM', label: 'SUV / LCV' },
  { id: 'OTR', label: 'Off-Road & Industrial' }
]

function Products({ onQuickView, onTriggerToast }) {
  const { t, tRaw } = useLang()
  const [productList, setProductList] = useState(PRODUCTS)
  const [category, setCategory] = useState('ALL')
  const [search, setSearch] = useState('')
  const { isLoggedIn } = useAuth()
  const { addItem } = useCart()
  const { setLoginOpen, setPendingProduct } = useUI()
  const [justAddedId, setJustAddedId] = useState(null)

  useEffect(() => {
    api.getProducts()
      .then(res => {
        if (res?.products && res.products.length > 0) {
          const mapped = res.products.map(p => ({
            ...p,
            Img: p.image || PRODUCTS[0]?.Img
          }))
          setProductList(mapped)
        }
      })
      .catch(() => {})
  }, [])

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setPendingProduct(product)
      setLoginOpen(true)
      return
    }
    addItem(product)
    setJustAddedId(product.id)
    if (onTriggerToast) onTriggerToast(`Added ${product.name} to cart!`)
    setTimeout(() => setJustAddedId(null), 1400)
  }

  const filteredProducts = useMemo(() => {
    return productList.filter(p => {
      // Category filter
      let matchesCat = true
      if (category === 'TBR') matchesCat = p.badge === 'TBR'
      else if (category === 'STR') matchesCat = p.badge === 'STR'
      else if (category === 'CAR') matchesCat = p.badge === 'CAR'
      else if (category === 'COMM') matchesCat = p.badge === 'SUV' || p.badge === 'LCV' || p.badge === '3W'
      else if (category === 'OTR') matchesCat = p.badge === 'OTR' || p.badge === 'IND' || p.badge === 'AGRI' || p.badge === 'TRL' || p.badge === 'ATV'

      // Search filter
      const q = search.toLowerCase().trim()
      const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.spec.toLowerCase().includes(q) || p.badge.toLowerCase().includes(q)

      return matchesCat && matchesSearch
    })
  }, [productList, category, search])

  return (
    <section id="products">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow"><span className="dash" />{t('products.eyebrow')}</div>
          <h2>{t('products.heading')}</h2>
          <p>{t('products.intro')}</p>
        </div>

        {/* Catalog Search & Category Filters */}
        <div className="catalog-controls">
          <div className="category-tabs">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={'cat-tab' + (category === c.id ? ' active' : '')}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="search-input-wrapper">
            <IconSearch />
            <input
              type="text"
              placeholder="Search tyre size, model..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--surface-2)', borderRadius: 10 }}>
            <p style={{ color: 'var(--muted)', fontSize: 16 }}>No tyres matching "{search}". Try searching by rim size (e.g., 22.5) or category.</p>
            <button className="btn btn-outline" style={{ marginTop: 14 }} onClick={() => { setSearch(''); setCategory('ALL') }}>
              Clear Search
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((p, i) => {
              const id = p.id ? `product-${p.id}` : `product-${i}`
              const displayName = tRaw('products.names.' + p.name) || p.name
              const priceOut = p.price === 'On request' ? t('products.onRequest')
                : p.price === 'On site visit' ? t('products.onSiteVisit')
                : `₹${p.price} ${t('products.perTyre')}`
              const isAdded = justAddedId === id

              return (
                <div className="product-card" key={id}>
                  <div className="pc-thumb" onClick={() => onQuickView({ ...p, id, displayName })}>
                    <span className="pc-badge">{p.badge}</span>
                    <img src={p.Img} alt={displayName} loading="lazy" />
                  </div>

                  <div className="pc-name" onClick={() => onQuickView({ ...p, id, displayName })}>
                    {displayName}
                  </div>
                  <div className="pc-spec">{p.spec}</div>

                  <div className="pc-price-strip">
                    <span className="pc-price">Approx: <b>{priceOut}</b></span>
                  </div>

                  <div className="pc-btn-row">
                    <button
                      className={'pc-cta-cart' + (isAdded ? ' added' : '')}
                      onClick={() => handleAddToCart({ id, name: displayName, price: p.price, badge: p.badge, Img: p.Img, spec: p.spec })}
                    >
                      {isAdded ? (
                        <>Added <IconCheck style={{ width: 14, height: 14 }} /></>
                      ) : (
                        <>{t('products.addToCart')} <IconPlus style={{ width: 14, height: 14 }} /></>
                      )}
                    </button>

                    <button
                      className="pc-cta-quick"
                      onClick={() => onQuickView({ ...p, id, displayName })}
                      title="Quick technical view"
                      aria-label="Quick technical view"
                    >
                      <IconEye style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

/* ============ Process Section ============ */
function ProcessDiagram({ steps, activeStep, onSelectStep }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(en => en.isIntersecting && setInView(true)), { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const R = 180, CX = 260, CY = 260
  const pts = steps.map((_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2
    return { x: CX + Math.cos(a) * R, y: CY + Math.sin(a) * R }
  })

  return (
    <div ref={ref} className="process-wrap">
      <svg className="process-svg" viewBox="0 0 520 520">
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
        {pts.map((p, i) => {
          const n = pts[(i + 1) % pts.length]
          const len = Math.hypot(n.x - p.x, n.y - p.y)
          return (
            <line
              key={'l' + i}
              x1={p.x} y1={p.y} x2={n.x} y2={n.y}
              stroke="var(--amber)"
              strokeWidth="2"
              className={`proc-path${inView ? ' drawn' : ''}`}
              style={{ strokeDasharray: len, strokeDashoffset: inView ? 0 : len, transitionDelay: i * 120 + 'ms' }}
            />
          )
        })}
        <circle cx={CX} cy={CY} r="60" fill="var(--surface)" stroke="var(--amber)" strokeWidth="2" />
        <text x={CX} y={CY - 4} textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="700" fontFamily="IBM Plex Mono">RETREAD</text>
        <text x={CX} y={CY + 14} textAnchor="middle" fill="var(--amber)" fontSize="10" fontFamily="IBM Plex Mono">CLOSED LOOP</text>

        {pts.map((p, i) => {
          const isSelected = activeStep === i
          return (
            <g key={'node-' + i} className="proc-node" onClick={() => onSelectStep(i)}>
              <circle
                cx={p.x} cy={p.y} r={isSelected ? 30 : 25}
                fill={isSelected ? 'var(--amber)' : 'var(--bg)'}
                stroke="var(--amber)"
                strokeWidth={isSelected ? 3 : 1.8}
                style={{ transition: 'all 0.25s ease' }}
              />
              <text
                x={p.x} y={p.y + 5}
                textAnchor="middle"
                fill={isSelected ? 'var(--amber-ink)' : 'var(--amber)'}
                fontSize="14"
                fontFamily="IBM Plex Mono"
                fontWeight="700"
              >
                0{i + 1}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function Process() {
  const { t, tRaw } = useLang()
  const steps = tRaw('process.steps') || []
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="process" className="band">
      <div className="wrap">
        <div className="section-head center">
          <div className="eyebrow"><span className="dash" />{t('process.eyebrow')}</div>
          <h2>{t('process.heading')}</h2>
          <p>{t('process.intro')}</p>
        </div>

        <ProcessDiagram steps={steps} activeStep={activeStep} onSelectStep={setActiveStep} />

        <div className="proc-list">
          {steps.map((s, i) => (
            <div
              className={'proc-item' + (activeStep === i ? ' active' : '')}
              key={i}
              onClick={() => setActiveStep(i)}
            >
              <div className="proc-num">0{i + 1} // STAGE</div>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ Gallery ============ */
function Tile({ type }) {
  const common = { viewBox: '0 0 400 300', preserveAspectRatio: 'xMidYMid slice' }
  if (type === 'inspection') return <svg {...common}><rect width="400" height="300" fill="var(--surface-2)"/><circle cx="200" cy="150" r="92" fill="none" stroke="var(--line-strong)" strokeWidth="18"/><circle cx="200" cy="150" r="72" fill="none" stroke="var(--amber)" strokeWidth="3"/><circle cx="200" cy="150" r="22" fill="var(--bg)" stroke="var(--line-strong)"/><path d="M40 245h320" stroke="var(--line-strong)"/></svg>
  if (type === 'buffing') return <svg {...common}><rect width="400" height="300" fill="var(--bg-2)"/><circle cx="200" cy="150" r="105" fill="none" stroke="var(--line-strong)" strokeWidth="28"/><circle cx="200" cy="150" r="72" fill="none" stroke="var(--amber)" strokeWidth="4"/><rect x="55" y="62" width="18" height="176" fill="var(--surface-2)"/><path d="M73 90h100M73 120h100M73 150h100M73 180h100M73 210h100" stroke="var(--amber)"/></svg>
  if (type === 'cushion') return <svg {...common}><rect width="400" height="300" fill="var(--surface)"/><rect x="60" y="120" width="280" height="60" rx="4" fill="var(--bg-2)" stroke="var(--line-strong)"/>{[0,1,2,3,4,5,6].map(i => <rect key={i} x={74+i*38} y="132" width="26" height="36" rx="2" fill="var(--surface-2)" stroke="var(--amber)"/>)}<rect x="60" y="200" width="280" height="8" rx="4" fill="var(--line-strong)"/><rect x="60" y="200" width="180" height="8" rx="4" fill="var(--amber)"/></svg>
  if (type === 'curing') return <svg {...common}><rect width="400" height="300" fill="var(--bg-2)"/><rect x="100" y="60" width="200" height="190" rx="6" fill="var(--bg)" stroke="var(--line-strong)" strokeWidth="2"/><circle cx="200" cy="155" r="64" fill="none" stroke="var(--amber)" strokeWidth="3"/><circle cx="200" cy="155" r="64" fill="none" stroke="var(--line-strong)" strokeDasharray="2 6"/><text x="200" y="280" textAnchor="middle" fill="var(--muted-2)" fontSize="11" fontFamily="IBM Plex Mono">148°C · 40 MIN</text></svg>
  if (type === 'lab') return <svg {...common}><rect width="400" height="300" fill="var(--surface)"/><rect x="40" y="190" width="320" height="6" fill="var(--line-strong)"/>{[40,110,180,250].map((x, i) => <rect key={i} x={x} y={110+i*8} width="60" height={80-i*8} fill="var(--surface-2)" stroke="var(--amber)"/>)}<circle cx="330" cy="90" r="26" fill="none" stroke="var(--amber)" strokeWidth="2"/><path d="M330 78v12l8 8" stroke="var(--amber)" strokeWidth="2"/></svg>
  return <svg {...common}><rect width="400" height="300" fill="var(--bg-2)"/><rect y="200" width="400" height="100" fill="var(--surface-2)"/><rect x="40" y="120" width="170" height="80" rx="2" fill="var(--bg)" stroke="var(--line-strong)"/><path d="M210 150h60l30 30v20h-90z" fill="var(--bg)" stroke="var(--line-strong)"/>{[90,170,262].map(x => <circle key={x} cx={x} cy="216" r="20" fill="var(--surface)" stroke="var(--amber)" strokeWidth="2"/>)}<line x1="20" y1="120" x2="380" y2="120" stroke="var(--line-strong)"/></svg>
}
const GALLERY_TYPES = ['inspection', 'buffing', 'cushion', 'curing', 'lab', 'dispatch']

function Gallery() {
  const { t, tRaw } = useLang()
  const items = tRaw('gallery.items') || []
  return (
    <section id="gallery">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow"><span className="dash" />{t('gallery.eyebrow')}</div>
          <h2>{t('gallery.heading')}</h2>
          <p>{t('gallery.intro')}</p>
        </div>
        <div className="gallery-grid">
          {items.map((it, i) => (
            <div className="g-tile" key={i}>
              <Tile type={GALLERY_TYPES[i]} />
              <div className="g-cap">
                <span className="g-tag">{it.tag}</span>
                <span className="g-title">{it.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ Testimonials ============ */
const TESTIMONIALS = [
  {
    name: 'Santosh Pawar',
    company: 'Western Express Haulage (Pune-Surat)',
    role: 'Fleet Logistics Director (85 Heavy Commercial Trucks)',
    quote: 'We moved our 10-wheeler fleet to City Sphere 2-cycle hot cure retreads 3 years ago. Our tyre budget dropped by 64% with zero casing failures on expressways.'
  },
  {
    name: 'Rajendra Jagdale',
    company: 'Baramati Agri Bulk Freight',
    role: 'Contract Transport Owner',
    quote: 'Casing shearography and precision buffing make all the difference. Steer-axle tyres give us 1.2 Lakh km run on regional highways without uneven shoulder wear.'
  },
  {
    name: 'Anand Shinde',
    company: 'Sahyadri Minerals & Mining',
    role: 'Quarry Operations Lead',
    quote: 'Heavy 24-inch rock-lug dump truck tyres cost a fortune new. City Sphere mould cure gives us identical traction and cut resistance at one-third the capital outlay.'
  }
]

function Testimonials() {
  return (
    <section className="band">
      <div className="wrap">
        <div className="section-head center">
          <div className="eyebrow"><span className="dash" />COMMERCIAL FLEET REVIEWS</div>
          <h2>Verified Performance Across Indian Highways</h2>
          <p>Read how commercial hauliers and transport operators achieve substantial cost-per-kilometre savings.</p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="test-card" key={i}>
              <div>
                <div className="test-stars">★★★★★</div>
                <p className="test-text">"{t.quote}"</p>
              </div>

              <div className="test-author">
                <div className="test-avatar">{t.name[0]}</div>
                <div className="test-info">
                  <b>{t.name}</b>
                  <span>{t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ FAQ Section ============ */
const FAQS = [
  {
    q: 'Are retreaded tyres safe for highway speeds?',
    a: 'Absolutely. Commercial aircraft and city buses ride almost entirely on retreaded tyres. City Sphere tests every casing to IS 15633 compliance under high autoclave pressure, ensuring identical bead-to-crown structural integrity.'
  },
  {
    q: 'How many times can a commercial tyre casing be retreaded?',
    a: 'A sound radial casing from tier-1 manufacturers (MRF, Apollo, JK, Michelin) can reliably undergo 2 to 3 retread cycles if maintained at proper inflation and removed before structural belt exposure.'
  },
  {
    q: 'What is the typical turnaround time for fleet orders?',
    a: 'Our Baramati plant processes batch orders within 3 to 5 business days, including shearography intake, CNC buffer profiling, cushion gum vulcanisation, and post-cure dimension clearance.'
  },
  {
    q: 'How does City Sphere calculate fleet tyre savings?',
    a: 'Retreading costs approximately 20-30% of a brand-new tyre while restoring up to 90% of first-life tread depth. Over 3 cycles, fleet operators typically lower aggregate tyre expenditure by 60% or more.'
  }
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section>
      <div className="wrap">
        <div className="section-head center">
          <div className="eyebrow"><span className="dash" />FREQUENTLY ASKED QUESTIONS</div>
          <h2>Everything You Need to Know About Fleet Retreading</h2>
          <p>Clear, engineering-backed answers to your fleet casing and performance questions.</p>
        </div>

        <div className="faq-list">
          {FAQS.map((f, i) => {
            const isOpen = openIndex === i
            return (
              <div className={'faq-item' + (isOpen ? ' open' : '')} key={i}>
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{f.q}</span>
                  <IconChevronDown className="faq-icon" />
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    {f.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ============ About ============ */
function About() {
  const { t } = useLang()
  return (
    <section id="about" className="band">
      <div className="wrap about-grid">
        <div>
          <div className="eyebrow"><span className="dash" />{t('about.eyebrow')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(30px,3.6vw,42px)' }}>{t('about.heading')}</h2>
          <div className="about-copy" style={{ marginTop: 22 }}>
            <p className="lead">{t('about.lead')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </div>
        </div>
        <div className="stat-grid">
          <div className="stat-cell"><b>{t('about.stat1v')}</b><span>{t('about.stat1l')}</span></div>
          <div className="stat-cell"><b>{t('about.stat2v')}</b><span>{t('about.stat2l')}</span></div>
          <div className="stat-cell"><b>{t('about.stat3v')}</b><span>{t('about.stat3l')}</span></div>
          <div className="stat-cell"><b>{t('about.stat4v')}</b><span>{t('about.stat4l')}</span></div>
        </div>
      </div>
    </section>
  )
}

/* ============ Contact ============ */
const MAP_LAT = 18.1852396, MAP_LNG = 74.6011885
const MAP_DIRECTIONS_URL = 'https://www.google.com/maps/place/JAGDALE+RETREADS/@18.1852396,74.5986136,17z'
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}&output=embed`

function Contact({ prefilledMessage }) {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [sentSuccess, setSentSuccess] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (prefilledMessage) {
      setForm(f => ({ ...f, message: prefilledMessage }))
    }
  }, [prefilledMessage])

  const update = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const send = async e => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await api.submitContact(form)
      setSentSuccess(res?.inquiry || { name: form.name, email: form.email })
      setForm({ name: '', company: '', email: '', phone: '', message: '' })
    } catch (err) {
      console.warn('Backend contact failed, falling back to mailto:', err)
      const subject = encodeURIComponent('Quote request — ' + (form.company || form.name || 'City Sphere'))
      const body = encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\n\n${form.message}`)
      window.location.href = 'mailto:quotes@citysphere-tyres.example?subject=' + subject + '&body=' + body
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact">
      <div className="wrap contact-grid">
        <div>
          <div className="eyebrow"><span className="dash" />{t('contact.eyebrow')}</div>
          <h2 style={{ marginTop: 14, fontSize: 'clamp(30px,3.6vw,42px)' }}>{t('contact.heading')}</h2>
          <p style={{ marginTop: 14, color: 'var(--muted)', fontSize: 15, maxWidth: '50ch' }}>{t('contact.intro')}</p>

          {sentSuccess ? (
            <div style={{ marginTop: 24, padding: '24px', background: 'var(--surface-2)', border: '1px solid var(--amber)', borderRadius: 10 }}>
              <div style={{ fontSize: 24, color: 'var(--amber)', marginBottom: 8 }}>✓ Fleet Enquiry Logged</div>
              <p style={{ color: 'var(--text)', fontSize: 14.5, lineHeight: 1.6 }}>
                Thank you, <b>{sentSuccess.name}</b>. Your tyre retreading enquiry has been recorded in our database. Our commercial operations desk will respond to <b>{sentSuccess.email}</b> within one business day.
              </p>
              <button
                type="button"
                className="btn btn-outline"
                style={{ marginTop: 16 }}
                onClick={() => setSentSuccess(null)}
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={send} style={{ marginTop: 34 }}>
              {error && (
                <div style={{ padding: '10px 14px', marginBottom: 16, background: 'rgba(239, 68, 68, 0.12)', border: '1px solid #ef4444', borderRadius: 6, color: '#ef4444', fontSize: 13 }}>
                  {error}
                </div>
              )}
              <div className="row2">
                <div className="field">
                  <label>{t('contact.nameLabel')}</label>
                  <input required value={form.name} onChange={update('name')} placeholder="e.g. Anand Jagdale" />
                </div>
                <div className="field">
                  <label>{t('contact.companyLabel')}</label>
                  <input value={form.company} onChange={update('company')} placeholder="e.g. Western Fleet Logistics" />
                </div>
              </div>
              <div className="row2">
                <div className="field">
                  <label>{t('contact.emailLabel')}</label>
                  <input type="email" required value={form.email} onChange={update('email')} placeholder="fleet@company.com" />
                </div>
                <div className="field">
                  <label>{t('contact.phoneLabel')}</label>
                  <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+91 98220 12345" />
                </div>
              </div>
              <div className="field">
                <label>{t('contact.messageLabel')}</label>
                <textarea required value={form.message} onChange={update('message')} placeholder={t('contact.messagePlaceholder')} />
              </div>
              <button type="submit" disabled={submitting} className="btn btn-solid" style={{ minWidth: 200 }}>
                {submitting ? 'Recording Enquiry...' : t('contact.send')}
              </button>
            </form>
          )}
        </div>

        <div>
          <div className="info-card">
            <div className="info-line">
              <IconPin />
              <div>
                <b>{t('contact.plantLabel')}</b>
                <span>{t('contact.plantAddr')}</span>
              </div>
            </div>
            <div className="info-line">
              <IconPhone />
              <div>
                <b>{t('contact.phoneCardLabel')}</b>
                <span>{t('contact.phoneNo')}</span>
              </div>
            </div>
            <div className="info-line">
              <IconMail />
              <div>
                <b>{t('contact.emailCardLabel')}</b>
                <span>{t('contact.emailAddr')}</span>
              </div>
            </div>
            <div className="info-line">
              <IconClock />
              <div>
                <b>{t('contact.hoursLabel')}</b>
                <span>{t('contact.hoursText')}</span>
              </div>
            </div>
            <div className="hours-strip">
              <span>{t('contact.monFri')}</span>
              <span>{t('contact.monFriTime')}</span>
            </div>
            <div className="hours-strip">
              <span>{t('contact.sat')}</span>
              <span>{t('contact.satTime')}</span>
            </div>
          </div>

          <div className="map-card">
            <iframe
              title="City Sphere location"
              src={MAP_EMBED_SRC}
              width="100%"
              height="220"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className="btn btn-outline map-directions-btn" href={MAP_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
              <IconPin /> {t('contact.directions')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============ Footer ============ */
function Footer() {
  const { t } = useLang()
  const SECTIONS = SECTION_IDS.map(id => ({
    id,
    label: id === 'calculator' ? 'ROI Calculator' : t('nav.' + id)
  }))

  return (
    <footer>
      <div className="wrap">
        <div className="foot-row">
          <div>
            <span className="brand-word">CITY <b>SPHERE</b></span>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
              Precision Commercial & Industrial Tyre Retreading Facility · Baramati MIDC
            </div>
          </div>
          <div className="foot-links">
            {SECTIONS.map(s => <a key={s.id} href={'#' + s.id}>{s.label}</a>)}
          </div>
        </div>
        <div className="foot-note">{t('footer.note')}</div>
      </div>
    </footer>
  )
}

/* ============ Main App ============ */
export default function App() {
  const { loginOpen, setLoginOpen, pendingProduct, setPendingProduct } = useUI()
  const { addItem } = useCart()

  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [ordersOpen, setOrdersOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const [calcSummary, setCalcSummary] = useState('')

  const handleLoginSuccess = () => {
    if (pendingProduct) {
      addItem(pendingProduct)
      setPendingProduct(null)
      setToastMessage(`Added ${pendingProduct.name} to cart!`)
    } else {
      setToastMessage('Signed in successfully!')
    }
  }

  const handleApplyCalc = (summary) => {
    setCalcSummary(summary)
    setToastMessage('Fleet ROI numbers transferred to quote form!')
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Nav onOpenOrders={() => setOrdersOpen(true)} />
      <Hero />
      <Products
        onQuickView={setQuickViewProduct}
        onTriggerToast={setToastMessage}
      />
      <section id="calculator" className="band">
        <div className="wrap">
          <Calculator onApplyToQuote={handleApplyCalc} />
        </div>
      </section>
      <Process />
      <Gallery />
      <Testimonials />
      <FAQ />
      <About />
      <Contact prefilledMessage={calcSummary} />
      <Footer />

      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(p, qty) => {
            for (let i = 0; i < qty; i++) {
              addItem({
                id: p.id,
                name: p.displayName || p.name,
                price: p.price,
                badge: p.badge,
                Img: p.Img,
                spec: p.spec
              })
            }
            setToastMessage(`Added ${qty} × ${p.displayName || p.name} to quote cart!`)
          }}
        />
      )}

      {ordersOpen && (
        <OrdersModal onClose={() => setOrdersOpen(false)} />
      )}

      <CartDrawer onTriggerToast={setToastMessage} />
      <ScrollToTop />
      {toastMessage && (
        <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
      )}
    </>
  )
}
