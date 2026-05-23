
const { useState } = React;

function Footer({ navigate }) {
  const go = (id) => { navigate(id); window.scrollTo(0,0); };

  const socialIcon = (type) => {
    const icons = {
      instagram: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
      telegram: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.01 9.475c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.393c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.873.747z"/></svg>,
      facebook: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
    };
    return icons[type];
  };

  return (
    <footer style={{ background: '#0F0F0F', color: '#fff', paddingTop: 80, paddingBottom: 0 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 48, paddingBottom: 64 }} className="footer-grid">
          {/* Col 1: Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
              <div style={{ width:32,height:32,borderRadius:8,background:'#E85D26',display:'flex',alignItems:'center',justifyContent:'center' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="5" width="14" height="9" rx="1.5" stroke="white" strokeWidth="1.5"/>
                  <rect x="5" y="2" width="8" height="3" rx="1" fill="white"/>
                  <circle cx="13" cy="9.5" r="1" fill="white"/>
                </svg>
              </div>
              <span style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:20,letterSpacing:'-0.02em' }}>
                humo<span style={{color:'#E85D26'}}>print</span>
              </span>
            </div>
            <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:14,color:'rgba(255,255,255,0.5)',lineHeight:1.7,marginBottom:24 }}>
              Sifatli bosma — ishonchli hamkor.
            </p>
            <div style={{ display:'flex',gap:12 }}>
              {['instagram','telegram','facebook'].map(s => (
                <a key={s} href="#" style={{
                  width:36,height:36,borderRadius:8,background:'rgba(255,255,255,0.07)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  color:'rgba(255,255,255,0.6)',textDecoration:'none',
                  transition:'background 0.2s,color 0.2s',
                }}
                  onMouseEnter={e=>{e.currentTarget.style.background='#E85D26';e.currentTarget.style.color='#fff';}}
                  onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.07)';e.currentTarget.style.color='rgba(255,255,255,0.6)';}}
                >{socialIcon(s)}</a>
              ))}
            </div>
          </div>

          {/* Col 2: Pages */}
          <div>
            <p style={{ fontFamily:'Outfit,sans-serif',fontWeight:600,fontSize:13,letterSpacing:'0.1em',color:'rgba(255,255,255,0.35)',textTransform:'uppercase',marginBottom:20 }}>Sahifalar</p>
            {[['home','Bosh sahifa'],['services','Xizmatlar'],['portfolio','Portfolio'],['try',"Sinab ko'rish"],['order','Buyurtma'],['contact','Aloqa']].map(([id,label]) => (
              <button key={id} onClick={()=>go(id)} style={{
                display:'block',background:'none',border:'none',cursor:'pointer',padding:'6px 0',
                fontFamily:'DM Sans,sans-serif',fontSize:14,color:'rgba(255,255,255,0.55)',
                textAlign:'left',transition:'color 0.2s',
              }}
                onMouseEnter={e=>e.target.style.color='#E85D26'}
                onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.55)'}
              >{label}</button>
            ))}
          </div>

          {/* Col 3: Services */}
          <div>
            <p style={{ fontFamily:'Outfit,sans-serif',fontWeight:600,fontSize:13,letterSpacing:'0.1em',color:'rgba(255,255,255,0.35)',textTransform:'uppercase',marginBottom:20 }}>Xizmatlar</p>
            {['Ofset bosma','Raqamli bosma','Souvenir','Banner','Qadoqlash','Dizayn'].map(s => (
              <button key={s} onClick={()=>go('services')} style={{
                display:'block',background:'none',border:'none',cursor:'pointer',padding:'6px 0',
                fontFamily:'DM Sans,sans-serif',fontSize:14,color:'rgba(255,255,255,0.55)',
                textAlign:'left',transition:'color 0.2s',
              }}
                onMouseEnter={e=>e.target.style.color='#E85D26'}
                onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.55)'}
              >{s}</button>
            ))}
          </div>

          {/* Col 4: Contact */}
          <div>
            <p style={{ fontFamily:'Outfit,sans-serif',fontWeight:600,fontSize:13,letterSpacing:'0.1em',color:'rgba(255,255,255,0.35)',textTransform:'uppercase',marginBottom:20 }}>Aloqa</p>
            {[
              ['📍','Toshkent sh., Yakkasaroy tumani'],
              ['📞','+998 99 123 45 67'],
              ['✉️','info@humopri nt.uz'],
              ['💬','@humopri nt_uz'],
              ['🕐','Du–Ju: 9:00–18:00'],
            ].map(([icon,val],i) => (
              <div key={i} style={{ display:'flex',gap:10,alignItems:'flex-start',marginBottom:12 }}>
                <span style={{fontSize:14,marginTop:1}}>{icon}</span>
                <span style={{ fontFamily:'DM Sans,sans-serif',fontSize:14,color:'rgba(255,255,255,0.55)',lineHeight:1.5 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.08)',padding:'24px 0',textAlign:'center' }}>
          <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:13,color:'rgba(255,255,255,0.3)' }}>
            © 2026 humopri nt. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
