import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion';
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  GlassWater,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Trees,
  Utensils,
  Waves,
  X
} from 'lucide-react';
import './styles.css';

const images = {
  logo: '/images/logo.png',
  facade: '/images/side-evening.png',
  aerial: '/images/side-evening.png',
  banquet: '/images/big-banquet.png',
  bar: '/images/bar.png',
  food: '/images/food.png',
  golf: '/images/golf-car.png',
  lobby1: '/images/lobby-1.png',
  lobby2: '/images/lobby-2.png',
  lobby3: '/images/lobby-3.png',
  olive: '/images/olive-tree.png',
  board: '/images/roadside-board.png',
  pool: '/images/pool.png'
};

const nav = [
  { label: 'Resort', page: 'resort' },
  { label: 'Venues', page: 'venues' },
  { label: 'Dining', page: 'dining' },
  { label: 'Gallery', page: 'gallery' },
  { label: 'Contact', page: 'contact' }
];

const heroSlides = [
  {
    image: images.facade,
    label: 'Arrival',
    title: 'Olive Green Resort & Villas',
    copy: 'A grand Kapurthala resort for stays, celebrations, dining and landscaped hospitality.'
  },
  {
    image: images.banquet,
    label: 'Banquets',
    title: 'Ceremony at full scale',
    copy: 'A chandelier-lit banquet hall built for weddings, receptions and destination gatherings.'
  },
  {
    image: images.pool,
    label: 'Leisure',
    title: 'Evenings by the water',
    copy: 'Poolside atmosphere, warm lighting and private corners for slower resort moments.'
  }
];

const manifesto = [
  'Luxury without noise',
  'Gardens before glass',
  'Celebrations with room to breathe',
  'Hospitality that feels personal'
];

const venues = [
  {
    title: 'Banquet Hall',
    meta: 'Weddings / Receptions / Corporate dinners',
    image: images.banquet,
    copy: 'A formal hall with sculpted ceilings, chandeliers, stage visibility and generous dining layouts.'
  },
  {
    title: 'Royal Lobby',
    meta: 'Arrival / Lounge / Portrait gallery',
    image: images.lobby2,
    copy: 'A long marble gallery of chandeliers, drapery and seating for arrivals that feel composed.'
  },
  {
    title: 'Restaurant & Bar',
    meta: 'Dining / Cocktails / Private hosting',
    image: images.bar,
    copy: 'A warm lounge language for dinner service, beverages and after-event conversations.'
  },
  {
    title: 'Garden Court',
    meta: 'Landscapes / Outdoor flow / Photo moments',
    image: images.aerial,
    copy: 'Illuminated gardens, fountains and wide paved courts frame the resort from day into night.'
  }
];

const amenities = [
  { icon: BedDouble, label: 'Rooms & villa stays' },
  { icon: Utensils, label: 'Restaurant' },
  { icon: GlassWater, label: 'Bar lounge' },
  { icon: CalendarDays, label: 'Banquet events' },
  { icon: Waves, label: 'Poolside leisure' },
  { icon: Trees, label: 'Landscaped grounds' }
];

const gallery = [
  { image: images.facade, title: 'Illuminated facade', area: 'Arrival' },
  { image: images.aerial, title: 'Garden court', area: 'Exterior' },
  { image: images.banquet, title: 'Grand banquet', area: 'Events' },
  { image: images.lobby2, title: 'Marble gallery', area: 'Interior' },
  { image: images.lobby3, title: 'Salon corridor', area: 'Interior' },
  { image: images.bar, title: 'Bar lounge', area: 'Dining' },
  { image: images.food, title: 'Signature plate', area: 'Dining' },
  { image: images.golf, title: 'Garden buggy', area: 'Grounds' },
  { image: images.olive, title: 'Olive tree', area: 'Landscape' },
  { image: images.pool, title: 'Pool at night', area: 'Leisure' },
  { image: images.board, title: 'Roadside sign', area: 'Wayfinding' }
];

function usePointer() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 220, damping: 32 });
  const springY = useSpring(y, { stiffness: 220, damping: 32 });

  useEffect(() => {
    const onMove = (event) => {
      x.set(event.clientX - 14);
      y.set(event.clientY - 14);
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y]);

  return { x: springX, y: springY };
}

function pageHref(page) {
  return page === 'home' ? '#/' : `#/${page}`;
}

function pageFromHash() {
  const page = window.location.hash.replace(/^#\/?/, '') || 'home';
  const validPages = ['home', ...nav.map((item) => item.page)];
  return validPages.includes(page) ? page : 'home';
}

function Header({ setMenuOpen, setPage }) {
  return (
    <header className="site-header">
      <a className="brand" href={pageHref('home')} onClick={() => setPage('home')} aria-label="Olive Green Resort & Villas home">
        <img src={images.logo} alt="Olive Green Resort & Villas" />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {nav.map((item) => (
          <a key={item.label} href={pageHref(item.page)} onClick={() => setPage(item.page)}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="call-link" href="tel:+917083300001">
        <Phone size={17} />
        +91 70833 00001
      </a>
      <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
        <Menu size={34} />
      </button>
    </header>
  );
}

function Loader({ loaded }) {
  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader-stage" aria-label="Loading Olive Green Resort & Villas">
            <motion.div
              className="loader-line"
              initial={{ scaleX: 0, rotate: -2 }}
              animate={{ scaleX: [0, 1, 1, 0.08], rotate: [-2, 3, -1, 0] }}
              transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], times: [0, 0.45, 0.75, 1] }}
            />
            <motion.div
              className="loader-orb"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1.08, 0.7], y: [20, 0, -8, 20] }}
              transition={{ duration: 1.9, delay: 0.22, ease: 'easeInOut' }}
            />
            <motion.div
              className="loader-title"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: [0, 1, 1, 0], y: [28, 0, 0, -22] }}
              transition={{ duration: 2.05, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>Olive</span>
              <span>Green</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MenuOverlay({ menuOpen, setMenuOpen, setPage }) {
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="menu-overlay"
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.58, ease: [0.76, 0, 0.24, 1] }}
        >
          <button className="menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={34} />
          </button>
          <div className="menu-logo">
            <img src={images.logo} alt="Olive Green Resort & Villas" />
          </div>
          <div className="menu-links">
            {nav.map((item, index) => (
              <motion.a
                href={pageHref(item.page)}
                key={item.label}
                onClick={() => {
                  setPage(item.page);
                  setMenuOpen(false);
                }}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 + index * 0.06 }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.label}
              </motion.a>
            ))}
          </div>
          <div className="menu-contact">
            <span>Near Kanjli Lake, Subhanpur Road, Kapurthala</span>
            <a href="mailto:cmd@olivegreenresortandvilla.com">cmd@olivegreenresortandvilla.com</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero() {
  const [slide, setSlide] = useState(0);
  const current = heroSlides[slide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((value) => (value + 1) % heroSlides.length);
    }, 6200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="top" aria-label="Olive Green Resort introduction">
      <AnimatePresence mode="wait">
        <motion.img
          key={current.image}
          src={current.image}
          alt=""
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      </AnimatePresence>
      <div className="hero-overlay" />
      <div className="hero-panel">
        <motion.span
          className="tiny-label"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {current.label} / Kapurthala
        </motion.span>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{ opacity: 0, y: 38 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.48 }}
          >
            <h1>{current.title}</h1>
            <p>{current.copy}</p>
          </motion.div>
        </AnimatePresence>
        <div className="hero-actions">
          <a href={pageHref('venues')}>
            Explore spaces
            <ArrowRight size={20} />
          </a>
          <a href={pageHref('contact')}>Plan a visit</a>
        </div>
      </div>
      <div className="hero-wordmark" aria-hidden="true">
        <span>Olive</span>
        <span>Green</span>
      </div>
      <div className="slide-controls" aria-label="Hero slide controls">
        <button onClick={() => setSlide((slide + heroSlides.length - 1) % heroSlides.length)} aria-label="Previous slide">
          <ChevronLeft size={21} />
        </button>
        <span>
          {String(slide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
        </span>
        <button onClick={() => setSlide((slide + 1) % heroSlides.length)} aria-label="Next slide">
          <ChevronRight size={21} />
        </button>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="intro">
      <div className="intro-copy">
        <span className="tiny-label">Resort profile</span>
        <h2>
          A resort made for <em>celebration</em>, quiet stays and the camera roll.
        </h2>
      </div>
      <div className="intro-text">
        <p>
          Olive Green Resort & Villas sits near Kanjli Lake on Subhanpur Road, Kapurthala, with a
          hospitality mix built around rooms, villa stays, banquet events, restaurant dining, a bar
          lounge, poolside leisure and manicured green landscapes.
        </p>
        <p>
          The new brand image leans into what the place already owns: a bold name, a living olive
          tree, night-lit architecture, royal interiors and a resort campus that feels event-ready.
        </p>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto">
      <div className="manifesto-pin">
        <CircleDot size={84} />
        <strong>Stay green. Host grand.</strong>
      </div>
      <div className="manifesto-list">
        {manifesto.map((item) => (
          <motion.p
            key={item}
            initial={{ opacity: 0.2, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.55 }}
          >
            {item}
          </motion.p>
        ))}
      </div>
    </section>
  );
}

function VenueGrid() {
  return (
    <section className="venues page-section">
      <div className="section-heading">
        <span className="tiny-label">Venues</span>
        <h2>Spaces with presence.</h2>
      </div>
      <div className="venue-grid">
        {venues.map((venue, index) => (
          <motion.article
            className="venue-tile"
            key={venue.title}
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.64, delay: index * 0.06 }}
          >
            <img src={venue.image} alt={venue.title} />
            <div>
              <span>{venue.meta}</span>
              <h3>{venue.title}</h3>
              <p>{venue.copy}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Dining() {
  return (
    <section className="dining page-section">
      <div className="dining-media">
        <img src={images.food} alt="Plated food and drink at Olive Green Resort & Villas" />
        <img src={images.bar} alt="Bar lounge at Olive Green Resort & Villas" />
      </div>
      <div className="dining-copy">
        <span className="tiny-label">Dining & lounge</span>
        <h2>Meals with a little theatre.</h2>
        <p>
          Restaurant service, banquet catering and a darker bar lounge give the property an all-day
          rhythm: breakfast before travel, lunch around meetings, dinner after ceremonies, and
          cocktails once the lights come on.
        </p>
        <div className="amenity-row">
          {amenities.map(({ icon: Icon, label }) => (
            <span key={label}>
              <Icon size={18} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Signature() {
  return (
    <section className="signature">
      <img src={images.olive} alt="Olive tree landscape feature at Olive Green Resort & Villas" />
      <div>
        <span className="tiny-label">Living symbol</span>
        <h2>The olive tree becomes the brand mark.</h2>
        <p>
          The mature tree in the garden gives the resort a rare physical identity: not just a logo,
          but a photographed landmark guests can meet, remember and share.
        </p>
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const visibleGallery = useMemo(() => (showAll ? gallery : gallery.slice(0, 6)), [showAll]);

  return (
    <section className="gallery-section page-section">
      <div className="gallery-top">
        <div>
          <span className="tiny-label">Gallery</span>
          <h2>Proof in pictures.</h2>
        </div>
        <button onClick={() => setShowAll((value) => !value)}>
          {showAll ? 'Show less' : 'Show more'}
          <ArrowRight size={18} />
        </button>
      </div>
      <div className="gallery-grid">
        {visibleGallery.map((item, index) => (
          <button
            className={index === 0 || index === 5 ? 'wide' : ''}
            key={item.title}
            onClick={() => setActive(item)}
          >
            <img src={item.image} alt={item.title} />
            <span>
              <small>{item.area}</small>
              {item.title}
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button aria-label="Close gallery">
              <X size={30} />
            </button>
            <motion.img
              src={active.image}
              alt={active.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
            />
            <p>{active.area} / {active.title}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact page-section">
      <div className="contact-image">
        <img src={images.board} alt="Olive Green Resort & Villas roadside sign" />
      </div>
      <div className="contact-copy">
        <span className="tiny-label">Contact</span>
        <h2>Plan the stay. Book the hall. Walk the gardens.</h2>
        <div className="contact-lines">
          <a href="https://maps.google.com/?q=Near%20Kanjli%20Lake%2C%20Subhanpur%20Road%2C%20Kapurthala" target="_blank" rel="noreferrer">
            <MapPin size={21} />
            Near Kanjli Lake, Subhanpur Road, Kapurthala
          </a>
          <a href="tel:+917083300001">
            <Phone size={21} />
            +91 70833 00001
          </a>
          <a href="mailto:cmd@olivegreenresortandvilla.com">
            <Sparkles size={21} />
            cmd@olivegreenresortandvilla.com
          </a>
        </div>
      </div>
    </section>
  );
}

function PageHero({ label, title, copy, image }) {
  return (
    <section className="page-hero">
      <img src={image} alt="" />
      <div className="hero-overlay" />
      <div>
        <span className="tiny-label">{label}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Manifesto />
    </>
  );
}

function ResortPage() {
  return (
    <>
      <PageHero
        label="Resort / Kapurthala"
        title="A green destination with a grand address."
        copy="Rooms, villas, lawns, poolside evenings and royal interiors near Kanjli Lake."
        image={images.aerial}
      />
      <Intro />
      <Signature />
    </>
  );
}

function VenuesPage() {
  return (
    <>
      <PageHero
        label="Venues"
        title="Banquets, lobbies and gardens built for occasion."
        copy="A focused look at the spaces that carry weddings, receptions and private events."
        image={images.banquet}
      />
      <VenueGrid />
    </>
  );
}

function DiningPage() {
  return (
    <>
      <PageHero
        label="Dining & Bar"
        title="Restaurant warmth, bar mood and event catering."
        copy="Food, drinks and lounge spaces that keep the resort alive from lunch to late evening."
        image={images.bar}
      />
      <Dining />
    </>
  );
}

function GalleryPage() {
  return (
    <>
      <PageHero
        label="Gallery"
        title="The resort in pictures."
        copy="Exterior, banquet, lobby, dining, garden and leisure moments from Olive Green."
        image={images.lobby3}
      />
      <Gallery />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Plan your visit to Olive Green."
        copy="Use the verified public details to enquire about rooms, banquets, dining or private events."
        image={images.board}
      />
      <Contact />
    </>
  );
}

function CurrentPage({ page }) {
  const pages = {
    home: <HomePage />,
    resort: <ResortPage />,
    venues: <VenuesPage />,
    dining: <DiningPage />,
    gallery: <GalleryPage />,
    contact: <ContactPage />
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={page}
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        {pages[page]}
      </motion.main>
    </AnimatePresence>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [page, setPageState] = useState(pageFromHash);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28 });
  const headerTone = useTransform(scrollYProgress, [0, 0.12], ['rgba(8, 18, 10, 0.62)', 'rgba(8, 18, 10, 0.9)']);
  const pointer = usePointer();

  const setPage = (nextPage) => {
    setPageState(nextPage);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 2350);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setPageState(pageFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <>
      <Loader loaded={loaded} />
      <motion.div className="cursor-dot" style={pointer} />
      <motion.div className="progress" style={{ scaleX: progress }} />
      {loaded && (
        <>
          <motion.div className="header-backdrop" style={{ backgroundColor: headerTone }} />
          <Header setMenuOpen={setMenuOpen} setPage={setPage} />
        </>
      )}
      <MenuOverlay menuOpen={menuOpen} setMenuOpen={setMenuOpen} setPage={setPage} />
      <CurrentPage page={page} />
      <footer>
        <img src={images.logo} alt="Olive Green Resort & Villas" />
        <span>Olive Green Resort & Villas</span>
        <span>Near Kanjli Lake, Subhanpur Road, Kapurthala</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
