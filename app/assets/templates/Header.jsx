
const { useState, useEffect } = React;

function Header({ currentPage, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { id: 'home', label: 'Bosh sahifa' },
    { id: 'services', label: 'Xizmatlar' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'try', label: "Sinab ko'rish" },
    { id: 'contact', label: 'Aloqa' },
  ];

  const go = (id) => { navigate(id); setMenuOpen(false); window.scrollTo(0,0); };

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 40px',
        height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(15,15,15,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'background 0.4s ease, border 0.4s ease',
      }}>
        {/* Logo */}
        <div onClick={() => go('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: '#E85D26',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="5" width="14" height="9" rx="1.5" stroke="white" strokeWidth="1.5"/>
              <rect x="5" y="2" width="8" height="3" rx="1" fill="white"/>
              <circle cx="13" cy="9.5" r="1" fill="white"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 20, color: '#fff', letterSpacing: '-0.02em' }}>
            humo<span style={{ color: '#E85D26' }}>print</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 500,
              color: currentPage === l.id ? '#E85D26' : 'rgba(255,255,255,0.75)',
              transition: 'color 0.2s',
              padding: '4px 0',
              borderBottom: currentPage === l.id ? '1.5px solid #E85D26' : '1.5px solid transparent',
            }}>{l.label}</button>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => go('order')} className="desktop-nav" style={{
            background: '#E85D26', color: '#fff', border: 'none', cursor: 'pointer',
            borderRadius: 100, padding: '10px 24px',
            fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 14,
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.target.style.transform='scale(1.03)'; e.target.style.boxShadow='0 8px 24px rgba(232,93,38,0.4)'; }}
            onMouseLeave={e => { e.target.style.transform='scale(1)'; e.target.style.boxShadow='none'; }}
          >Buyurtma berish</button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 8,
            display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ display:'block', width:24, height:2, background:'#fff', transition:'all 0.3s', transform: menuOpen?'rotate(45deg) translate(5px,5px)':'none' }}/>
            <span style={{ display:'block', width:24, height:2, background:'#fff', transition:'all 0.3s', opacity: menuOpen?0:1 }}/>
            <span style={{ display:'block', width:24, height:2, background:'#fff', transition:'all 0.3s', transform: menuOpen?'rotate(-45deg) translate(5px,-5px)':'none' }}/>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: '#0F0F0F',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 40,
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {links.map(l => (
          <button key={l.id} onClick={() => go(l.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 36,
            color: currentPage === l.id ? '#E85D26' : '#fff',
            letterSpacing: '-0.02em',
          }}>{l.label}</button>
        ))}
        <button onClick={() => go('order')} style={{
          marginTop: 16, background: '#E85D26', color: '#fff', border: 'none', cursor: 'pointer',
          borderRadius: 100, padding: '16px 40px',
          fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 18,
        }}>Buyurtma berish →</button>
      </div>
    </>
  );
}

Object.assign(window, { Header });
