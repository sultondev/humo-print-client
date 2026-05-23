
const { useState } = React;

const ALL_ITEMS = [
  { img:'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=700&q=80', title:'Korporativ vizitka', cat:'Vizitka', desc:'100% ekologik qog\'ozda yuqori sifatli ofset bosma.' },
  { img:'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=700&q=80', title:'Brendlangan krujka', cat:'Souvenir', desc:'Sublimatsiya usulida chop etilgan brendlangan krujkalar.' },
  { img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80', title:'Moda do\'koni banneri', cat:'Banner', desc:"3×6 metrli tashqi reklama banneri." },
  { img:'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=700&q=80', title:'Mahsulot qadoqlash', cat:'Qadoqlash', desc:'Brendlangan kartон quti, maxsus litografiya.' },
  { img:'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=700&q=80', title:'Yillik hisobot', cat:'Katalog', desc:'64 betli to\'liq rangli ofset katalog.' },
  { img:'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&q=80', title:'Stiker to\'plami', cat:'Stiker', desc:'Vinilli suv o\'tkazmaydigan stikerlar.' },
  { img:'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=80', title:'Notarial vizitka', cat:'Vizitka', desc:'Zarhal bosma, premium karton.' },
  { img:'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=700&q=80', title:'Restoран menyu', cat:'Katalog', desc:'A4 laminated menyu, 24 bet.' },
  { img:'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=700&q=80', title:'Sovg\'a quti', cat:'Qadoqlash', desc:'Maxsus shaklda kesib chiqarilgan sovg\'a quti.' },
  { img:'https://images.unsplash.com/photo-1513506003901-1e6a35082a5f?w=700&q=80', title:'Roll-up banner', cat:'Banner', desc:'85×200 sm pull-up banner, alyumin konstruktsiya.' },
  { img:'https://images.unsplash.com/photo-1562564055-71e051d33c19?w=700&q=80', title:'Promo futbolka', cat:'Souvenir', desc:'DTG texnologiyasi bilan to\'g\'ridan-to\'g\'ri bosma.' },
  { img:'https://images.unsplash.com/photo-1558618047-f4e90e8f3e1a?w=700&q=80', title:'Flayer dizayni', cat:'Stiker', desc:'A5 o\'lchamida raqamli bosma flayer.' },
];

const FILTERS = ['Barchasi','Vizitka','Katalog','Banner','Souvenir','Qadoqlash','Stiker'];

function PortfolioPage({ navigate }) {
  const [active, setActive] = useState('Barchasi');
  const [lightbox, setLightbox] = useState(null);
  const [shown, setShown] = useState(6);

  const filtered = active === 'Barchasi' ? ALL_ITEMS : ALL_ITEMS.filter(i => i.cat === active);
  const visible = filtered.slice(0, shown);

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section style={{ background:'#0F0F0F', padding:'80px 40px 100px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
            <div style={{ width:32,height:1.5,background:'#E85D26' }}/>
            <span style={{ fontFamily:'Space Mono,monospace',fontSize:11,letterSpacing:'0.15em',color:'#E85D26',textTransform:'uppercase' }}>Portfolio</span>
          </div>
          <h1 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:'clamp(48px,6vw,80px)',letterSpacing:'-0.03em',color:'#fff',marginBottom:20 }}>
            Bizning ishlarimiz
          </h1>
          <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:20,color:'rgba(255,255,255,0.5)',maxWidth:560 }}>
            Yuzlab mijozlar uchun yaratilgan sifatli bosma mahsulotlar.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div style={{ background:'#fff', position:'sticky', top:72, zIndex:100, borderBottom:'1px solid rgba(0,0,0,0.07)' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 40px', display:'flex', gap:0, overflowX:'auto' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={()=>{ setActive(f); setShown(6); }} style={{
              background:'none', border:'none', cursor:'pointer',
              padding:'20px 20px',
              fontFamily:'DM Sans,sans-serif', fontSize:14, fontWeight:500, whiteSpace:'nowrap',
              color: active===f ? '#E85D26' : '#6B6B6B',
              borderBottom: active===f ? '2px solid #E85D26' : '2px solid transparent',
              transition:'color 0.2s',
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section style={{ background:'#F5F0EB', padding:'60px 40px 80px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }} className="portfolio-full-grid">
            {visible.map((item,i) => (
              <div key={item.title+i} onClick={()=>setLightbox(item)} style={{ cursor:'pointer' }}>
                <PortfolioCardFull {...item}/>
              </div>
            ))}
          </div>

          {shown < filtered.length && (
            <div style={{ textAlign:'center', marginTop:48 }}>
              <button onClick={()=>setShown(s=>s+6)} style={{
                background:'#0F0F0F', color:'#fff', border:'none', cursor:'pointer',
                borderRadius:100, padding:'16px 40px',
                fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:15,
                transition:'background 0.2s',
              }}
                onMouseEnter={e=>e.target.style.background='#E85D26'}
                onMouseLeave={e=>e.target.style.background='#0F0F0F'}
              >Ko'proq ko'rish</button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={()=>setLightbox(null)} style={{
          position:'fixed',inset:0,zIndex:2000,background:'rgba(0,0,0,0.88)',
          display:'flex',alignItems:'center',justifyContent:'center',padding:40,
        }}>
          <div onClick={e=>e.stopPropagation()} style={{
            background:'#fff',borderRadius:20,overflow:'hidden',maxWidth:800,width:'100%',
            display:'grid',gridTemplateColumns:'1fr 1fr',
          }} className="lightbox-inner">
            <img src={lightbox.img} alt={lightbox.title} style={{ width:'100%',height:'100%',objectFit:'cover',display:'block',minHeight:360 }}/>
            <div style={{ padding:40, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
              <div>
                <span style={{ fontFamily:'Space Mono,monospace',fontSize:10,color:'#E85D26',letterSpacing:'0.1em',textTransform:'uppercase' }}>{lightbox.cat}</span>
                <h3 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:28,color:'#0F0F0F',marginTop:12,marginBottom:16,letterSpacing:'-0.02em' }}>{lightbox.title}</h3>
                <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:15,color:'#6B6B6B',lineHeight:1.7 }}>{lightbox.desc}</p>
              </div>
              <div>
                <button onClick={()=>{ navigate('order'); setLightbox(null); window.scrollTo(0,0); }} style={{
                  background:'#E85D26',color:'#fff',border:'none',cursor:'pointer',
                  borderRadius:100,padding:'14px 28px',width:'100%',
                  fontFamily:'DM Sans,sans-serif',fontWeight:600,fontSize:15,
                  marginBottom:12,
                }}>Shunga o'xshash buyurtma berish</button>
                <button onClick={()=>setLightbox(null)} style={{
                  background:'none',color:'#6B6B6B',border:'1px solid #ddd',cursor:'pointer',
                  borderRadius:100,padding:'12px 28px',width:'100%',
                  fontFamily:'DM Sans,sans-serif',fontWeight:500,fontSize:14,
                }}>Yopish</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PortfolioCardFull({ img, title, cat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ borderRadius:14,overflow:'hidden',position:'relative',aspectRatio:'4/3',boxShadow: hovered?'0 16px 40px rgba(0,0,0,0.15)':'0 2px 8px rgba(0,0,0,0.08)',transition:'box-shadow 0.3s' }}>
      <img src={img} alt={title} style={{ width:'100%',height:'100%',objectFit:'cover',display:'block',
        transform:hovered?'scale(1.06)':'scale(1)',transition:'transform 0.5s ease' }}/>
      <div style={{
        position:'absolute',inset:0,
        background:hovered?'rgba(15,15,15,0.72)':'rgba(15,15,15,0)',
        display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:20,
        transition:'background 0.35s ease',
      }}>
        <div style={{ opacity:hovered?1:0,transform:hovered?'translateY(0)':'translateY(10px)',transition:'all 0.3s ease 0.05s' }}>
          <div style={{ fontFamily:'Space Mono,monospace',fontSize:10,color:'#E85D26',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:6 }}>{cat}</div>
          <div style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:18,color:'#fff' }}>{title}</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PortfolioPage });
