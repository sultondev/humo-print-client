
const { useState } = React;

function ContactPage() {
  const [form, setForm] = useState({ name:'', phone:'', message:'' });
  const [sent, setSent] = useState(false);

  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const submit = (e) => { e.preventDefault(); setSent(true); };

  const inputStyle = {
    width:'100%', boxSizing:'border-box',
    padding:'14px 16px', border:'1.5px solid rgba(0,0,0,0.12)',
    borderRadius:10, outline:'none',
    fontFamily:'DM Sans,sans-serif', fontSize:15, color:'#0F0F0F',
    background:'#fff', transition:'border-color 0.2s',
    display:'block',
  };

  const contactItems = [
    { icon:'📍', label:'Manzil', val:'Toshkent sh., Yakkasaroy tumani, Chapanata ko\'chasi, 7' },
    { icon:'📞', label:'Telefon', val:'+998 99 123 45 67' },
    { icon:'✉️', label:'Email', val:'info@humopri nt.uz' },
    { icon:'💬', label:'Telegram', val:'@humopri nt_uz' },
    { icon:'🕐', label:'Ish vaqti', val:'Dushanba–Juma: 9:00–18:00' },
  ];

  return (
    <div style={{ paddingTop:72 }}>
      {/* Hero */}
      <section style={{ background:'#0F0F0F', padding:'80px 40px 100px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:24 }}>
            <div style={{ width:32,height:1.5,background:'#E85D26' }}/>
            <span style={{ fontFamily:'Space Mono,monospace',fontSize:11,letterSpacing:'0.15em',color:'#E85D26',textTransform:'uppercase' }}>Aloqa</span>
          </div>
          <h1 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:'clamp(48px,6vw,80px)',letterSpacing:'-0.03em',color:'#fff',marginBottom:20 }}>
            Biz bilan bog'laning
          </h1>
          <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:20,color:'rgba(255,255,255,0.5)',maxWidth:560 }}>
            Savollaringiz bormi? Biz yordam berishga tayyormiz.
          </p>
        </div>
      </section>

      <section style={{ background:'#F5F0EB', padding:'80px 40px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'start' }} className="contact-grid">

          {/* Contact info */}
          <div>
            <h2 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:32,color:'#0F0F0F',marginBottom:32,letterSpacing:'-0.02em' }}>
              Aloqa ma'lumotlari
            </h2>
            <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:40 }}>
              {contactItems.map(item => (
                <div key={item.label} style={{
                  background:'#fff', borderRadius:14, padding:'20px 24px',
                  display:'flex', alignItems:'flex-start', gap:16,
                  boxShadow:'0 2px 10px rgba(0,0,0,0.05)',
                }}>
                  <div style={{ width:44,height:44,borderRadius:12,background:'rgba(232,93,38,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily:'DM Sans,sans-serif',fontSize:12,color:'#6B6B6B',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em' }}>{item.label}</div>
                    <div style={{ fontFamily:'DM Sans,sans-serif',fontWeight:600,fontSize:15,color:'#0F0F0F',lineHeight:1.5 }}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div style={{
              borderRadius:16, overflow:'hidden', height:240, background:'#e8e4df',
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              position:'relative', border:'1px solid rgba(0,0,0,0.08)',
            }}>
              {/* Striped map placeholder */}
              <div style={{ position:'absolute',inset:0,backgroundImage:'repeating-linear-gradient(45deg,rgba(0,0,0,0.03) 0px,rgba(0,0,0,0.03) 1px,transparent 1px,transparent 12px)', backgroundSize:'17px 17px' }}/>
              <div style={{ position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8 }}>
                <div style={{ width:36,height:36,borderRadius:'50% 50% 50% 0',background:'#E85D26',transform:'rotate(-45deg)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                  <div style={{ width:10,height:10,borderRadius:'50%',background:'#fff',transform:'rotate(45deg)' }}/>
                </div>
                <span style={{ fontFamily:'Space Mono,monospace',fontSize:11,color:'#6B6B6B',letterSpacing:'0.08em',textTransform:'uppercase',marginTop:4 }}>Yakkasaroy tumani, Toshkent</span>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div style={{ background:'#fff', borderRadius:20, padding:48, boxShadow:'0 4px 32px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:28,color:'#0F0F0F',marginBottom:32,letterSpacing:'-0.02em' }}>
              Xabar yuborish
            </h2>
            {sent ? (
              <div style={{ textAlign:'center', padding:'40px 0' }}>
                <div style={{ fontSize:48, marginBottom:16 }}>✉️</div>
                <h3 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:24,color:'#0F0F0F',marginBottom:10 }}>Xabaringiz yuborildi!</h3>
                <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:15,color:'#6B6B6B' }}>Tez orada siz bilan bog'lanamiz.</p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
                <div>
                  <label style={{ fontFamily:'DM Sans,sans-serif',fontWeight:600,fontSize:14,color:'#0F0F0F',marginBottom:6,display:'block' }}>Ismingiz</label>
                  <input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="To'liq ismingiz"
                    required style={inputStyle}
                    onFocus={e=>e.target.style.borderColor='#E85D26'}
                    onBlur={e=>e.target.style.borderColor='rgba(0,0,0,0.12)'}/>
                </div>
                <div>
                  <label style={{ fontFamily:'DM Sans,sans-serif',fontWeight:600,fontSize:14,color:'#0F0F0F',marginBottom:6,display:'block' }}>Telefon</label>
                  <input type="tel" value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+998 90 123 45 67"
                    required style={inputStyle}
                    onFocus={e=>e.target.style.borderColor='#E85D26'}
                    onBlur={e=>e.target.style.borderColor='rgba(0,0,0,0.12)'}/>
                </div>
                <div>
                  <label style={{ fontFamily:'DM Sans,sans-serif',fontWeight:600,fontSize:14,color:'#0F0F0F',marginBottom:6,display:'block' }}>Xabar</label>
                  <textarea value={form.message} onChange={e=>set('message',e.target.value)} rows={5}
                    placeholder="Savolingizni yozing..." required
                    style={{...inputStyle, resize:'vertical', lineHeight:1.6}}
                    onFocus={e=>e.target.style.borderColor='#E85D26'}
                    onBlur={e=>e.target.style.borderColor='rgba(0,0,0,0.12)'}/>
                </div>
                <button type="submit" style={{
                  background:'#E85D26', color:'#fff', border:'none', cursor:'pointer',
                  borderRadius:12, padding:'16px', fontSize:15, fontWeight:700,
                  fontFamily:'DM Sans,sans-serif', marginTop:4,
                  transition:'transform 0.2s, box-shadow 0.2s',
                }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.01)';e.currentTarget.style.boxShadow='0 10px 28px rgba(232,93,38,0.4)';}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='none';}}
                >Xabar yuborish →</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { ContactPage });
