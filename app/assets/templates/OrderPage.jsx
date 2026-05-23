
const { useState, useEffect, useRef } = React;

// Custom Dropdown component — replaces native <select> with a designed picker
function CustomDropdown({ value, onChange, options, placeholder, error }) {
  const [open, setOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  const rootRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const selected = options.find(o => o.value === value);

  return (
    <div ref={rootRef} style={{ position:'relative' }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={()=>setOpen(o=>!o)}
        style={{
          width:'100%', boxSizing:'border-box',
          padding:'12px 16px',
          border: error ? '1.5px solid #E85D26'
                : open ? '1.5px solid #E85D26'
                : '1.5px solid rgba(0,0,0,0.12)',
          borderRadius:10, outline:'none', cursor:'pointer',
          background:'#fff',
          fontFamily:'DM Sans,sans-serif', fontSize:15,
          display:'flex', alignItems:'center', justifyContent:'space-between',
          gap:12, textAlign:'left',
          transition:'border-color 0.2s, box-shadow 0.2s',
          boxShadow: open ? '0 0 0 4px rgba(232,93,38,0.08)' : 'none',
          lineHeight: 1.4,
        }}
      >
        <span style={{
          display:'flex', alignItems:'center', gap:10,
          color: selected ? '#0F0F0F' : '#999',
          fontWeight: selected ? 500 : 400,
          flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
        }}>
          {selected ? (
            <>
              <span style={{
                width:24, height:24, borderRadius:6,
                background:'rgba(232,93,38,0.1)',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:12, flexShrink:0,
              }}>{selected.icon}</span>
              {selected.label}
            </>
          ) : placeholder}
        </span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none"
          style={{ transition:'transform 0.25s ease', transform: open ? 'rotate(180deg)' : 'rotate(0)', flexShrink:0 }}>
          <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B6B6B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown panel */}
      <div style={{
        position:'absolute', top:'calc(100% + 6px)', left:0, right:0,
        background:'#fff', borderRadius:12,
        boxShadow:'0 16px 40px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.04)',
        border:'1px solid rgba(0,0,0,0.06)',
        padding:6, zIndex:50,
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.98)',
        transformOrigin:'top center',
        transition:'opacity 0.2s ease, transform 0.2s ease',
        pointerEvents: open ? 'auto' : 'none',
        maxHeight: 320, overflowY:'auto',
      }}>
        {options.map((opt, i) => {
          const isActive = opt.value === value;
          const isHovered = hoveredIdx === i;
          return (
            <button
              key={opt.value}
              type="button"
              onMouseEnter={()=>setHoveredIdx(i)}
              onMouseLeave={()=>setHoveredIdx(-1)}
              onClick={()=>{ onChange(opt.value); setOpen(false); }}
              style={{
                display:'flex', alignItems:'center', gap:12,
                width:'100%', padding:'10px 12px',
                background: isActive ? 'rgba(232,93,38,0.08)'
                          : isHovered ? '#F5F0EB'
                          : 'transparent',
                border:'none', cursor:'pointer', borderRadius:8,
                fontFamily:'DM Sans,sans-serif', fontSize:14,
                color: isActive ? '#E85D26' : '#0F0F0F',
                fontWeight: isActive ? 600 : 500,
                textAlign:'left',
                transition:'background 0.12s ease',
              }}
            >
              <span style={{
                width:32, height:32, borderRadius:8,
                background: isActive ? '#E85D26' : 'rgba(232,93,38,0.1)',
                color: isActive ? '#fff' : 'inherit',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:16, flexShrink:0,
                transition:'background 0.15s, color 0.15s',
              }}>{opt.icon}</span>
              <span style={{ flex:1 }}>
                <div>{opt.label}</div>
                {opt.desc && (
                  <div style={{ fontSize:11, color:'#999', fontWeight:400, marginTop:2 }}>{opt.desc}</div>
                )}
              </span>
              {isActive && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{flexShrink:0}}>
                  <path d="M2 7L5.5 10.5L12 4" stroke="#E85D26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const PRODUCT_OPTIONS = [
  { value:'Vizitka',           icon:'💳', label:'Vizitka',           desc:"Korporativ va shaxsiy vizitkalar" },
  { value:'Katalog',           icon:'📖', label:'Katalog',           desc:"Buklet, jurnal, kitob" },
  { value:'Banner',            icon:'🚩', label:'Banner',            desc:"Tashqi reklama va bilbordlar" },
  { value:'Flayer',            icon:'📃', label:'Flayer',            desc:"Reklama va promo varaqalar" },
  { value:'Stiker',            icon:'⭐', label:'Stiker',            desc:"Brendlangan stikerlar" },
  { value:'Krujka / Souvenir', icon:'☕', label:'Krujka / Souvenir', desc:"Brendlangan sovg'a buyumlari" },
  { value:'Qadoqlash',         icon:'📦', label:'Qadoqlash',         desc:"Quti, paket va maxsus forma" },
  { value:'Boshqa',            icon:'✨', label:'Boshqa',            desc:"Boshqa bosma xizmatlar" },
];

function OrderPage() {
  const [form, setForm] = useState({ name:'', phone:'', product:'', qty:'', date:'', note:'', file:null, promo:'' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [promoStatus, setPromoStatus] = useState(null); // null | 'valid' | 'invalid'

  // Demo promo codes
  const PROMO_CODES = {
    'HUMO10':  { discount: 10, label: '10% chegirma' },
    'YANGI15': { discount: 15, label: '15% chegirma (yangi mijozlar)' },
    'TOSHKENT20': { discount: 20, label: "20% chegirma — Toshkent bo'ylab" },
  };

  const applyPromo = () => {
    const code = form.promo.trim().toUpperCase();
    if (!code) { setPromoStatus(null); return; }
    setPromoStatus(PROMO_CODES[code] ? { ok:true, ...PROMO_CODES[code] } : { ok:false });
  };

  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const validate = () => {
    const e = {};
    if(!form.name.trim()) e.name = "Ismingizni kiriting";
    if(!form.phone.trim()) e.phone = "Telefon raqamingizni kiriting";
    if(!form.product) e.product = "Mahsulot turini tanlang";
    if(!form.qty) e.qty = "Miqdorni kiriting";
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if(Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  };

  const inputStyle = (err) => ({
    width:'100%', boxSizing:'border-box',
    padding:'14px 16px', border: err ? '1.5px solid #E85D26' : '1.5px solid rgba(0,0,0,0.12)',
    borderRadius:10, outline:'none',
    fontFamily:'DM Sans,sans-serif', fontSize:15, color:'#0F0F0F',
    background:'#fff', transition:'border-color 0.2s',
  });

  const labelStyle = { fontFamily:'DM Sans,sans-serif',fontWeight:600,fontSize:14,color:'#0F0F0F',marginBottom:6,display:'block' };

  return (
    <div style={{ paddingTop:72 }}>
      {/* Hero */}
      <section style={{ background:'#0F0F0F', padding:'80px 40px 100px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:24 }}>
            <div style={{ width:32,height:1.5,background:'#E85D26' }}/>
            <span style={{ fontFamily:'Space Mono,monospace',fontSize:11,letterSpacing:'0.15em',color:'#E85D26',textTransform:'uppercase' }}>Buyurtma</span>
          </div>
          <h1 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:'clamp(48px,6vw,80px)',letterSpacing:'-0.03em',color:'#fff',marginBottom:20 }}>
            Buyurtma berish
          </h1>
          <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:20,color:'rgba(255,255,255,0.5)',maxWidth:560 }}>
            Formani to'ldiring — biz 30 daqiqa ichida aloqaga chiqamiz.
          </p>
        </div>
      </section>

      <section style={{ background:'#F5F0EB', padding:'80px 40px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 380px', gap:64, alignItems:'start' }} className="order-grid">

          {/* Form */}
          <div style={{ background:'#fff', borderRadius:20, padding:48, boxShadow:'0 4px 32px rgba(0,0,0,0.06)' }}>
            {submitted ? (
              <div style={{ textAlign:'center', padding:'40px 0' }}>
                <div style={{ fontSize:56, marginBottom:20 }}>✅</div>
                <h2 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:32,color:'#0F0F0F',marginBottom:12 }}>Buyurtma qabul qilindi!</h2>
                <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:16,color:'#6B6B6B',lineHeight:1.7 }}>
                  Rahmat, {form.name}! Biz siz bilan 30 daqiqa ichida bog'lanamiz.
                </p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }} className="form-2col">
                  <div>
                    <label style={labelStyle}>Ismingiz <span style={{color:'#E85D26'}}>*</span></label>
                    <input value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Masalan: Aziz"
                      style={inputStyle(errors.name)}
                      onFocus={e=>e.target.style.borderColor='#E85D26'}
                      onBlur={e=>e.target.style.borderColor=errors.name?'#E85D26':'rgba(0,0,0,0.12)'}/>
                    {errors.name && <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:12,color:'#E85D26',marginTop:4 }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Telefon raqamingiz <span style={{color:'#E85D26'}}>*</span></label>
                    <input type="tel" value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="+998 90 123 45 67"
                      style={inputStyle(errors.phone)}
                      onFocus={e=>e.target.style.borderColor='#E85D26'}
                      onBlur={e=>e.target.style.borderColor=errors.phone?'#E85D26':'rgba(0,0,0,0.12)'}/>
                    {errors.phone && <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:12,color:'#E85D26',marginTop:4 }}>{errors.phone}</p>}
                  </div>
                </div>

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }} className="form-2col">
                  <div>
                    <label style={labelStyle}>Mahsulot turi <span style={{color:'#E85D26'}}>*</span></label>
                    <CustomDropdown
                      value={form.product}
                      onChange={(v)=>set('product', v)}
                      options={PRODUCT_OPTIONS}
                      placeholder="Mahsulotni tanlang..."
                      error={!!errors.product}
                    />
                    {errors.product && <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:12,color:'#E85D26',marginTop:4 }}>{errors.product}</p>}
                  </div>
                  <div>
                    <label style={labelStyle}>Miqdori <span style={{color:'#E85D26'}}>*</span></label>
                    <input type="number" value={form.qty} onChange={e=>set('qty',e.target.value)} placeholder="100"
                      style={inputStyle(errors.qty)} min="1"
                      onFocus={e=>e.target.style.borderColor='#E85D26'}
                      onBlur={e=>e.target.style.borderColor=errors.qty?'#E85D26':'rgba(0,0,0,0.12)'}/>
                    {errors.qty && <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:12,color:'#E85D26',marginTop:4 }}>{errors.qty}</p>}
                  </div>
                </div>

                <div style={{ marginBottom:20 }}>
                  <label style={labelStyle}>Kerakli sana <span style={{color:'#6B6B6B',fontWeight:400}}>(ixtiyoriy)</span></label>
                  <input type="date" value={form.date} onChange={e=>set('date',e.target.value)}
                    style={inputStyle(false)}
                    onFocus={e=>e.target.style.borderColor='#E85D26'}
                    onBlur={e=>e.target.style.borderColor='rgba(0,0,0,0.12)'}/>
                </div>

                <div style={{ marginBottom:20 }}>
                  <label style={labelStyle}>Qo'shimcha izoh <span style={{color:'#6B6B6B',fontWeight:400}}>(ixtiyoriy)</span></label>
                  <textarea value={form.note} onChange={e=>set('note',e.target.value)} rows={4}
                    placeholder="Dizayn haqida, o'lcham yoki boshqa tafsilotlar..."
                    style={{...inputStyle(false), resize:'vertical', lineHeight:1.6}}
                    onFocus={e=>e.target.style.borderColor='#E85D26'}
                    onBlur={e=>e.target.style.borderColor='rgba(0,0,0,0.12)'}/>
                </div>

                <div style={{ marginBottom:20 }}>
                  <label style={labelStyle}>Promo-kod <span style={{color:'#6B6B6B',fontWeight:400}}>(ixtiyoriy)</span></label>
                  <div style={{ display:'flex', gap:8 }}>
                    <input
                      value={form.promo}
                      onChange={e=>{ set('promo', e.target.value); setPromoStatus(null); }}
                      placeholder="Masalan: HUMO10"
                      style={{
                        ...inputStyle(false),
                        textTransform:'uppercase',
                        letterSpacing:'0.05em',
                        fontFamily:'Space Mono, monospace',
                        flex: 1,
                      }}
                      onFocus={e=>e.target.style.borderColor='#E85D26'}
                      onBlur={e=>e.target.style.borderColor= promoStatus?.ok===false ? '#E85D26' : 'rgba(0,0,0,0.12)'}
                    />
                    <button type="button" onClick={applyPromo} style={{
                      background: form.promo.trim() ? '#0F0F0F' : 'rgba(0,0,0,0.08)',
                      color: form.promo.trim() ? '#fff' : '#6B6B6B',
                      border:'none', cursor: form.promo.trim() ? 'pointer' : 'not-allowed',
                      borderRadius:10, padding:'0 22px',
                      fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:14,
                      transition:'background 0.2s',
                      whiteSpace:'nowrap',
                    }}>Qo'llash</button>
                  </div>
                  {promoStatus?.ok && (
                    <div style={{
                      marginTop:8, padding:'10px 12px',
                      background:'rgba(34,197,94,0.1)', borderRadius:8,
                      display:'flex', alignItems:'center', gap:8,
                    }}>
                      <span style={{fontSize:14}}>✅</span>
                      <span style={{fontFamily:'DM Sans,sans-serif',fontSize:13,fontWeight:600,color:'#16A34A'}}>
                        Faollashtirildi: {promoStatus.label}
                      </span>
                    </div>
                  )}
                  {promoStatus?.ok === false && (
                    <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:12,color:'#E85D26',marginTop:6 }}>
                      Bunday promo-kod topilmadi
                    </p>
                  )}
                </div>

                <div style={{ marginBottom:32 }}>
                  <label style={labelStyle}>Fayl yuklash <span style={{color:'#6B6B6B',fontWeight:400}}>(ixtiyoriy)</span></label>
                  <label style={{
                    display:'flex', alignItems:'center', gap:12, cursor:'pointer',
                    border:'1.5px dashed rgba(0,0,0,0.15)', borderRadius:10, padding:'14px 16px',
                    fontFamily:'DM Sans,sans-serif', fontSize:14, color:'#6B6B6B',
                    transition:'border-color 0.2s, background 0.2s',
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor='#E85D26';e.currentTarget.style.background='rgba(232,93,38,0.02)';}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(0,0,0,0.15)';e.currentTarget.style.background='transparent';}}>
                    <input type="file" accept=".pdf,.ai,.jpg,.jpeg,.png" style={{display:'none'}}
                      onChange={e=>set('file',e.target.files[0])}/>
                    <span style={{fontSize:20}}>📎</span>
                    <span>{form.file ? form.file.name : "Dizayn faylini yuklang (PDF, AI, JPG)"}</span>
                  </label>
                </div>

                <button type="submit" style={{
                  width:'100%', background:'#E85D26', color:'#fff', border:'none', cursor:'pointer',
                  borderRadius:12, padding:'18px', fontSize:16, fontWeight:700,
                  fontFamily:'DM Sans,sans-serif',
                  transition:'transform 0.2s, box-shadow 0.2s',
                }}
                  onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.01)';e.currentTarget.style.boxShadow='0 10px 28px rgba(232,93,38,0.4)';}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='none';}}
                >Buyurtmani yuborish →</button>

                <div style={{ display:'flex',alignItems:'center',gap:8,marginTop:16,justifyContent:'center' }}>
                  <span style={{fontSize:16}}>🔒</span>
                  <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:13,color:'#6B6B6B',textAlign:'center' }}>
                    Ma'lumotlaringiz xavfsiz. Biz 30 daqiqa ichida javob beramiz.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {[
              { icon:'📞', label:'Telefon', val:'+998 99 123 45 67' },
              { icon:'💬', label:'Telegram', val:'@humopri nt_uz' },
              { icon:'🕐', label:'Ish vaqti', val:'Du–Ju: 9:00–18:00' },
            ].map(item => (
              <div key={item.label} style={{
                background:'#fff', borderRadius:16, padding:24,
                boxShadow:'0 2px 12px rgba(0,0,0,0.06)',
                display:'flex', alignItems:'center', gap:16,
              }}>
                <div style={{ width:44,height:44,borderRadius:12,background:'rgba(232,93,38,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily:'DM Sans,sans-serif',fontSize:12,color:'#6B6B6B',marginBottom:4 }}>{item.label}</div>
                  <div style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:16,color:'#0F0F0F' }}>{item.val}</div>
                </div>
              </div>
            ))}
            <div style={{ background:'#0F0F0F', borderRadius:16, padding:24 }}>
              <div style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:17,color:'#fff',marginBottom:8 }}>Tez javob kafolati</div>
              <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:14,color:'rgba(255,255,255,0.5)',lineHeight:1.65 }}>
                Buyurtmangizni qabul qilgandan so'ng 30 daqiqa ichida mutaxassisimiz siz bilan bog'lanadi.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

Object.assign(window, { OrderPage });
