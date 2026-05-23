
const { useState, useEffect, useRef } = React;

// Scroll-reveal hook
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) { setVisible(true); obs.disconnect(); }}, { threshold: 0.12 });
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeUp({ children, delay=0, style={} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
      <div style={{ width:32, height:1.5, background:'#E85D26' }}/>
      <span style={{ fontFamily:'Space Mono,monospace', fontSize:11, letterSpacing:'0.15em', color:'#E85D26', textTransform:'uppercase' }}>{text}</span>
    </div>
  );
}

// --- HERO ---
function Hero({ navigate }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  return (
    <section style={{
      minHeight: '100vh', background: '#0F0F0F',
      display:'flex', alignItems:'center',
      position:'relative', overflow:'hidden',
      padding: '120px 40px 80px',
    }}>
      {/* Subtle grain overlay */}
      <div style={{
        position:'absolute',inset:0,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.4, pointerEvents:'none',
      }}/>
      {/* Orange glow */}
      <div style={{ position:'absolute', top:'-20%', right:'-10%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(232,93,38,0.12) 0%, transparent 70%)', pointerEvents:'none' }}/>

      <div style={{ maxWidth:1200, margin:'0 auto', width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }} className="hero-grid">
        {/* Left: Text */}
        <div>
          <div style={{
            opacity: loaded?1:0, transform: loaded?'translateY(0)':'translateY(24px)',
            transition:'opacity 0.7s ease, transform 0.7s ease',
          }}>
            <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:28 }}>
              <div style={{ width:32,height:1.5,background:'#E85D26' }}/>
              <span style={{ fontFamily:'Space Mono,monospace',fontSize:11,letterSpacing:'0.15em',color:'#E85D26',textTransform:'uppercase' }}>Toshkent · O'zbekiston</span>
            </div>
            <h1 style={{
              fontFamily:'Outfit,sans-serif', fontWeight:800, lineHeight:1.05,
              letterSpacing:'-0.03em', color:'#fff',
              fontSize:'clamp(42px,6vw,80px)', marginBottom:28,
            }}>
              Har qanday g'oyani{' '}
              <span style={{ color:'#E85D26' }}>bosma</span>{' '}
              shaklga aylantiramiz
            </h1>
            <p style={{
              fontFamily:'DM Sans,sans-serif', fontSize:'clamp(16px,1.5vw,20px)',
              color:'rgba(255,255,255,0.55)', lineHeight:1.7, marginBottom:40, maxWidth:480,
            }}>
              Vizitka, banner, souvenir, qadoqlash va boshqa — yuqori sifat, tezkor yetkazib berish.
            </p>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:52 }}>
              <button onClick={()=>{ navigate('order'); window.scrollTo(0,0); }} style={{
                background:'#E85D26', color:'#fff', border:'none', cursor:'pointer',
                borderRadius:100, padding:'16px 32px',
                fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:16,
                display:'flex', alignItems:'center', gap:8,
                transition:'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.03)';e.currentTarget.style.boxShadow='0 12px 32px rgba(232,93,38,0.4)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='none';}}
              >Buyurtma berish <span style={{fontSize:18}}>→</span></button>
              <button onClick={()=>{ navigate('portfolio'); window.scrollTo(0,0); }} style={{
                background:'transparent', color:'#fff',
                border:'1.5px solid rgba(255,255,255,0.25)', cursor:'pointer',
                borderRadius:100, padding:'16px 32px',
                fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:16,
                transition:'border-color 0.2s, background 0.2s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.7)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.25)';}}
              >Ishlarimizni ko'rish</button>
            </div>
            {/* Trust badges */}
            <div style={{ display:'flex', gap:32, flexWrap:'wrap' }}>
              {[['500+','Mijoz'],['10 yil','Tajriba'],['1 kun','Tayyor']].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:22,color:'#fff' }}>{n}</div>
                  <div style={{ fontFamily:'DM Sans,sans-serif',fontSize:13,color:'rgba(255,255,255,0.4)' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div style={{
          opacity: loaded?1:0, transform: loaded?'translateY(0)':'translateY(24px)',
          transition:'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
        }} className="hero-image-wrap">
          <div style={{ position:'relative', borderRadius:24, overflow:'hidden', aspectRatio:'4/5' }}>
            <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80" alt="Printing products"
              style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
            <div style={{ position:'absolute',inset:0,background:'linear-gradient(160deg,transparent 60%,rgba(15,15,15,0.5))' }}/>
            {/* Floating badge */}
            <div style={{
              position:'absolute', bottom:24, left:24,
              background:'rgba(15,15,15,0.85)', backdropFilter:'blur(12px)',
              borderRadius:12, padding:'12px 18px',
              border:'1px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{fontFamily:'Space Mono,monospace',fontSize:10,color:'#E85D26',letterSpacing:'0.1em',marginBottom:4}}>YANGI BUYURTMA</div>
              <div style={{fontFamily:'DM Sans,sans-serif',fontSize:14,color:'#fff',fontWeight:600}}>Vizitka × 500 dona</div>
              <div style={{fontFamily:'DM Sans,sans-serif',fontSize:12,color:'rgba(255,255,255,0.4)'}}>Tayyor: 1 ish kuni</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- SERVICES OVERVIEW ---
const SERVICES = [
  { icon:'🖨', title:'Ofset bosma', desc:'Katalog, jurnal, buklet — katta tirajda sifatli bosma.' },
  { icon:'⚡', title:'Raqamli bosma', desc:'Vizitka, flayer, stiker — tez va sifatli.' },
  { icon:'🎁', title:'Souvenir mahsulotlar', desc:'Krujka, futbolka, qalam va boshqa brendlangan sovg\'alar.' },
  { icon:'🚩', title:'Banner va tashqi reklama', desc:'Katta formatdagi bannerlar, bilbordlar, ko\'cha reklamalari.' },
  { icon:'📦', title:'Qadoqlash', desc:'Brendlangan quti, paket va maxsus qadoqlash yechimlari.' },
  { icon:'✏️', title:'Dizayn xizmati', desc:'Professional grafik dizayn — logotipdan to katalogga qadar.' },
];

function ServicesOverview({ navigate }) {
  return (
    <section style={{ background:'#F5F0EB', padding:'120px 40px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <FadeUp>
          <SectionLabel text="Xizmatlar"/>
          <h2 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:'clamp(36px,4vw,56px)',letterSpacing:'-0.03em',color:'#0F0F0F',marginBottom:64 }}>
            Biz nima qilamiz
          </h2>
        </FadeUp>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }} className="services-grid">
          {SERVICES.map((s,i) => (
            <FadeUp key={s.title} delay={i*80}>
              <ServiceCard {...s}/>
            </FadeUp>
          ))}
        </div>
        <FadeUp style={{ textAlign:'center', marginTop:48 }}>
          <button onClick={()=>{ navigate('services'); window.scrollTo(0,0); }} style={{
            background:'none', border:'none', cursor:'pointer',
            fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:16,
            color:'#E85D26', display:'inline-flex', alignItems:'center', gap:8,
            transition:'gap 0.2s',
          }}
            onMouseEnter={e=>e.currentTarget.style.gap='14px'}
            onMouseLeave={e=>e.currentTarget.style.gap='8px'}
          >Barchasini ko'rish →</button>
        </FadeUp>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} style={{
      background:'#fff', borderRadius:16, padding:32,
      boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.06)',
      transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      transition:'transform 0.25s ease, box-shadow 0.25s ease',
      cursor:'default',
    }}>
      <div style={{ fontSize:32, marginBottom:20 }}>{icon}</div>
      <h3 style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:20,color:'#0F0F0F',marginBottom:10 }}>{title}</h3>
      <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:15,color:'#6B6B6B',lineHeight:1.65 }}>{desc}</p>
    </div>
  );
}

// --- PORTFOLIO PREVIEW ---
const PORTFOLIO_ITEMS = [
  { img:'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80', title:'Korporativ vizitka', cat:'Vizitka' },
  { img:'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&q=80', title:'Souvenir krujka', cat:'Souvenir' },
  { img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', title:'Moda banneri', cat:'Banner' },
  { img:'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80', title:'Brendlangan quti', cat:'Qadoqlash' },
  { img:'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80', title:'Mahsulot kataloq', cat:'Bosma' },
  { img:'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80', title:'Stiker to\'plami', cat:'Stiker' },
];

function PortfolioPreview({ navigate }) {
  const [activeFilter, setActiveFilter] = useState('Barchasi');
  const filters = ['Barchasi','Bosma','Souvenir','Qadoqlash','Banner'];

  return (
    <section style={{ background:'#0F0F0F', padding:'120px 40px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <FadeUp>
          <SectionLabel text="Portfolio"/>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:24, marginBottom:40 }}>
            <h2 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:'clamp(36px,4vw,56px)',letterSpacing:'-0.03em',color:'#fff' }}>
              So'nggi ishlarimiz
            </h2>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {filters.map(f => (
                <button key={f} onClick={()=>setActiveFilter(f)} style={{
                  background:'none', border:'none', cursor:'pointer', padding:'8px 16px',
                  fontFamily:'DM Sans,sans-serif', fontSize:13, fontWeight:500,
                  color: activeFilter===f ? '#E85D26' : 'rgba(255,255,255,0.4)',
                  borderBottom: activeFilter===f ? '1.5px solid #E85D26' : '1.5px solid transparent',
                  transition:'color 0.2s',
                }}>{f}</button>
              ))}
            </div>
          </div>
        </FadeUp>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }} className="portfolio-preview-grid">
          {PORTFOLIO_ITEMS.map((item,i) => (
            <FadeUp key={item.title} delay={i*60}>
              <PortfolioThumb {...item}/>
            </FadeUp>
          ))}
        </div>
        <FadeUp style={{ textAlign:'center', marginTop:48 }}>
          <button onClick={()=>{ navigate('portfolio'); window.scrollTo(0,0); }} style={{
            background:'none', border:'none', cursor:'pointer',
            fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:16,
            color:'#E85D26', display:'inline-flex', alignItems:'center', gap:8,
            transition:'gap 0.2s',
          }}
            onMouseEnter={e=>e.currentTarget.style.gap='14px'}
            onMouseLeave={e=>e.currentTarget.style.gap='8px'}
          >Barcha ishlarni ko'rish →</button>
        </FadeUp>
      </div>
    </section>
  );
}

function PortfolioThumb({ img, title, cat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{ borderRadius:12, overflow:'hidden', position:'relative', aspectRatio:'4/3', cursor:'pointer' }}>
      <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block',
        transform: hovered?'scale(1.06)':'scale(1)', transition:'transform 0.5s ease' }}/>
      <div style={{
        position:'absolute',inset:0,
        background: hovered ? 'rgba(15,15,15,0.75)' : 'rgba(15,15,15,0)',
        display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:20,
        transition:'background 0.35s ease',
      }}>
        <div style={{ opacity: hovered?1:0, transform: hovered?'translateY(0)':'translateY(10px)', transition:'all 0.3s ease 0.05s' }}>
          <div style={{ fontFamily:'Space Mono,monospace',fontSize:10,color:'#E85D26',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:6 }}>{cat}</div>
          <div style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:18,color:'#fff' }}>{title}</div>
        </div>
      </div>
    </div>
  );
}

// --- HOW IT WORKS ---
function HowItWorks() {
  const steps = [
    { n:'01', title:"Buyurtma yuboring", desc:"Formani to'ldiring yoki bizga qo'ng'iroq qiling." },
    { n:'02', title:"Dizaynni tasdiqlang", desc:"Biz maket tayyorlaymiz, siz tasdiqlaysiz." },
    { n:'03', title:"Ishlab chiqarish", desc:"Zamonaviy uskunalarda sifatli bosma." },
    { n:'04', title:"Yetkazib berish", desc:"Tayyor mahsulotni o'z vaqtida olasiz." },
  ];
  return (
    <section style={{ background:'#F5F0EB', padding:'120px 40px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <FadeUp>
          <SectionLabel text="Jarayon"/>
          <h2 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:'clamp(36px,4vw,56px)',letterSpacing:'-0.03em',color:'#0F0F0F',marginBottom:64 }}>
            Buyurtma berish juda oson
          </h2>
        </FadeUp>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:0, position:'relative' }} className="steps-grid">
          {steps.map((s,i) => (
            <FadeUp key={s.n} delay={i*100}>
              <div style={{ paddingRight:32, paddingBottom:32, position:'relative' }}>
                {i < steps.length-1 && (
                  <div style={{ position:'absolute', top:36, right:0, left:'60%', height:1, borderTop:'2px dashed rgba(232,93,38,0.3)' }} className="step-connector"/>
                )}
                <div style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:64,color:'#E85D26',lineHeight:1,marginBottom:16,opacity:0.9 }}>{s.n}</div>
                <h3 style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:20,color:'#0F0F0F',marginBottom:10 }}>{s.title}</h3>
                <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:15,color:'#6B6B6B',lineHeight:1.65 }}>{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- TESTIMONIALS ---
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const quotes = [
    { text:"PrintCraft bilan ishlash juda qulay. Vizitkalamiz 2 kunda tayyor bo'ldi, sifati a'lo darajada.", name:"Aziz Karimov", role:"GreenTech direktori" },
    { text:"Katalogimizni ofset usulda chop etishdi — rang va sifat kutganimizdek chiqdi.", name:"Nilufar Rashidova", role:"MedPlus marketing menejeri" },
    { text:"Har safar o'z vaqtida, sifatli va professional xizmat. Tavsiya qilaman!", name:"Jasur Toshmatov", role:"FastBuild asoschisi" },
  ];
  useEffect(() => {
    const t = setInterval(()=>setIdx(i=>(i+1)%quotes.length), 5000);
    return ()=>clearInterval(t);
  }, []);

  return (
    <section style={{ background:'#fff', padding:'120px 40px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <FadeUp>
          <SectionLabel text="Mijozlar fikri"/>
          <h2 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:'clamp(36px,4vw,56px)',letterSpacing:'-0.03em',color:'#0F0F0F',marginBottom:64 }}>
            Bizga ishonishadi
          </h2>
        </FadeUp>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }} className="testimonials-grid">
          {quotes.map((q,i) => (
            <FadeUp key={i} delay={i*80}>
              <div style={{
                background:'#F5F0EB', borderRadius:16, padding:36,
                border: idx===i ? '1.5px solid #E85D26' : '1.5px solid transparent',
                transition:'border 0.3s',
              }}>
                <div style={{ fontFamily:'Outfit,sans-serif',fontSize:56,color:'#E85D26',lineHeight:0.8,marginBottom:20,opacity:0.6 }}>"</div>
                <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:16,color:'#0F0F0F',lineHeight:1.7,fontStyle:'italic',marginBottom:24 }}>{q.text}</p>
                <div style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:15,color:'#0F0F0F' }}>{q.name}</div>
                <div style={{ fontFamily:'DM Sans,sans-serif',fontSize:13,color:'#6B6B6B',marginTop:4 }}>{q.role}</div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- CTA BANNER ---
function CTABanner({ navigate }) {
  return (
    <section style={{ background:'#0F0F0F', padding:'100px 40px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(232,93,38,0.1) 0%, transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center', position:'relative' }}>
        <FadeUp>
          <h2 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:'clamp(36px,4vw,56px)',letterSpacing:'-0.03em',color:'#fff',marginBottom:16 }}>
            Loyihangizni boshlashga tayyormisiz?
          </h2>
          <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:18,color:'rgba(255,255,255,0.5)',marginBottom:40 }}>
            Bepul maslahat va narx hisob-kitobi uchun hoziroq murojaat qiling.
          </p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', alignItems:'center', flexWrap:'wrap' }}>
            <button onClick={()=>{ navigate('order'); window.scrollTo(0,0); }} style={{
              background:'#E85D26', color:'#fff', border:'none', cursor:'pointer',
              borderRadius:100, padding:'18px 40px',
              fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:17,
              transition:'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.03)';e.currentTarget.style.boxShadow='0 12px 32px rgba(232,93,38,0.4)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='none';}}
            >Buyurtma berish</button>
            <a href="tel:+998991234567" style={{
              fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:18,color:'#fff',textDecoration:'none',
              display:'flex',alignItems:'center',gap:8,
            }}>
              <span style={{fontSize:20}}>📞</span> +998 99 123 45 67
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// --- FAQ ---
function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    { q:"Minimal buyurtma miqdori qancha?", a:"Raqamli bosmada minimal miqdor 1 dona, ofset bosmada esa 100 donadan boshlanadi." },
    { q:"Buyurtma qancha vaqtda tayyor bo'ladi?", a:"Oddiy buyurtmalar 1–3 ish kunida, murakkab loyihalar 5–7 ish kunida tayyor bo'ladi." },
    { q:"Dizayn xizmati ham bormi?", a:"Ha, professional dizaynerlarimiz maket tayyorlashdan to tayyor dizayngacha yordam beradi." },
    { q:"Yetkazib berish bormi?", a:"Ha, Toshkent bo'ylab bepul yetkazib berish mavjud." },
    { q:"To'lov qanday amalga oshiriladi?", a:"Naqd, karta va bank o'tkazmasi orqali to'lash mumkin." },
  ];
  return (
    <section style={{ background:'#F5F0EB', padding:'120px 40px' }}>
      <div style={{ maxWidth:760, margin:'0 auto' }}>
        <FadeUp>
          <SectionLabel text="Savollar"/>
          <h2 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:'clamp(36px,4vw,52px)',letterSpacing:'-0.03em',color:'#0F0F0F',marginBottom:48 }}>
            Ko'p beriladigan savollar
          </h2>
        </FadeUp>
        {items.map((item,i) => (
          <FadeUp key={i} delay={i*60}>
            <div style={{
              borderTop: i===0 ? '1px solid rgba(0,0,0,0.1)' : 'none',
              borderBottom: '1px solid rgba(0,0,0,0.1)',
              borderLeft: open===i ? '3px solid #E85D26' : '3px solid transparent',
              transition:'border-left 0.3s',
            }}>
              <button onClick={()=>setOpen(open===i?null:i)} style={{
                width:'100%', background:'none', border:'none', cursor:'pointer',
                padding:'24px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:16,
                textAlign:'left',
              }}>
                <span style={{ fontFamily:'Outfit,sans-serif',fontWeight:600,fontSize:18,color:'#0F0F0F' }}>{item.q}</span>
                <span style={{ fontSize:20, color:'#E85D26', flexShrink:0, transition:'transform 0.3s', transform: open===i?'rotate(45deg)':'rotate(0)' }}>+</span>
              </button>
              <div style={{
                maxHeight: open===i ? 200 : 0, overflow:'hidden',
                transition:'max-height 0.35s ease',
              }}>
                <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:16,color:'#6B6B6B',lineHeight:1.7,padding:'0 16px 24px' }}>{item.a}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function HomePage({ navigate }) {
  return (
    <div>
      <Hero navigate={navigate}/>
      <ServicesOverview navigate={navigate}/>
      <PortfolioPreview navigate={navigate}/>
      <HowItWorks/>
      <Testimonials/>
      <CTABanner navigate={navigate}/>
      <FAQ/>
    </div>
  );
}

Object.assign(window, { HomePage, FadeUp, SectionLabel, SERVICES, PORTFOLIO_ITEMS, PortfolioThumb });
