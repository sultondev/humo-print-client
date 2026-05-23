
const { useState } = React;

function ServicesPage({ navigate }) {
  const services = [
    {
      img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
      title: 'Ofset bosma',
      desc: 'Ofset texnologiyasi yordamida katta tirajdagi bosma mahsulotlar ishlab chiqariladi. Rang aniqligi va sifati yuqori darajada bo\'ladi. Katalog, jurnal, buklet va kitob uchun ideal.',
      products: ['Katalog', 'Jurnal', 'Buklet', 'Kitob', 'Plakat'],
    },
    {
      img: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
      title: 'Raqamli bosma',
      desc: 'Kichik tirajlar uchun eng qulay usul. Bir kundan kam vaqtda tayyor bo\'ladi. Vizitka, flayer, stiker va boshqa tezkor bosma xizmatlar.',
      products: ['Vizitka', 'Flayer', 'Stiker', 'Pochta kartasi', 'Menyu'],
      reverse: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
      title: 'Souvenir mahsulotlar',
      desc: 'Brendlangan sovg\'a va promo mahsulotlar. Korporativ va shaxsiy uchun. Har xil bosma usullari: sublimatsiya, pad-bosma, lazyer o\'ymakorligi.',
      products: ['Krujka', 'Futbolka', 'Qalam', 'Daftar', 'USB flesh'],
    },
    {
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      title: 'Banner va tashqi reklama',
      desc: 'Katta formatdagi bosma xizmatlar. Uzoq muddatli UV-himoyalangan siyoh. Ko\'cha, do\'kon va tadbirlar uchun.',
      products: ['Bannerlar', 'Bilbord', 'Roll-up', 'Vitrina', 'Vывеска'],
      reverse: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
      title: 'Qadoqlash',
      desc: 'Brendlangan quti va paketlar. Har qanday o\'lcham va shakl. Mahsulotingizni ajralib turuvchi qadoqlash.',
      products: ['Quti', 'Paket', 'Lenta', 'Stiker', 'Maxsus forma'],
    },
    {
      img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      title: 'Dizayn xizmati',
      desc: 'Professional grafik dizaynerlar jamoasi. Logotip, korporativ uslub, reklama materiali va boshqa dizayn yechimlari.',
      products: ['Logotip', 'Korporativ uslub', 'Reklama', 'Qadoqlash dizayni', 'Katalog'],
      reverse: true,
    },
  ];

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section style={{ background:'#0F0F0F', padding:'80px 40px 100px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
            <div style={{ width:32,height:1.5,background:'#E85D26' }}/>
            <span style={{ fontFamily:'Space Mono,monospace',fontSize:11,letterSpacing:'0.15em',color:'#E85D26',textTransform:'uppercase' }}>Xizmatlar</span>
          </div>
          <h1 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:'clamp(48px,6vw,80px)',letterSpacing:'-0.03em',color:'#fff',marginBottom:20 }}>
            Xizmatlarimiz
          </h1>
          <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:20,color:'rgba(255,255,255,0.5)',maxWidth:560 }}>
            Har qanday bosma ehtiyojingiz uchun professional yechimlar.
          </p>
        </div>
      </section>

      {/* Services list */}
      <div style={{ background:'#fff' }}>
        {services.map((s, i) => (
          <ServiceRow key={s.title} {...s} idx={i} navigate={navigate}/>
        ))}
      </div>
    </div>
  );
}

function ServiceRow({ img, title, desc, products, reverse, idx, navigate }) {
  const [ref, visible] = useRevealSvc();
  return (
    <div ref={ref} style={{
      background: idx % 2 === 0 ? '#fff' : '#F5F0EB',
      padding: '100px 40px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 80,
        alignItems: 'center',
        direction: reverse ? 'rtl' : 'ltr',
      }} className="service-row-grid">
        <div style={{ direction: 'ltr', borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3' }}>
          <img src={img} alt={title} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
        </div>
        <div style={{ direction: 'ltr' }}>
          <h2 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:'clamp(32px,3vw,48px)',letterSpacing:'-0.03em',color:'#0F0F0F',marginBottom:16 }}>{title}</h2>
          <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:17,color:'#6B6B6B',lineHeight:1.75,marginBottom:28 }}>{desc}</p>
          <div style={{ display:'flex',flexWrap:'wrap',gap:8,marginBottom:36 }}>
            {products.map(p => (
              <span key={p} style={{
                fontFamily:'DM Sans,sans-serif',fontSize:13,fontWeight:500,
                color:'#0F0F0F', background:'rgba(232,93,38,0.1)',
                borderRadius:100, padding:'6px 14px',
              }}>{p}</span>
            ))}
          </div>
          <button onClick={()=>{ navigate('order'); window.scrollTo(0,0); }} style={{
            background:'#E85D26', color:'#fff', border:'none', cursor:'pointer',
            borderRadius:100, padding:'14px 28px',
            fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:15,
            transition:'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.03)';e.currentTarget.style.boxShadow='0 8px 24px rgba(232,93,38,0.35)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='none';}}
          >Buyurtma berish →</button>
        </div>
      </div>
    </div>
  );
}

function useRevealSvc() {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold:0.1});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);
  return [ref, visible];
}

Object.assign(window, { ServicesPage });
