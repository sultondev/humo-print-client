
const { useState, useEffect, useRef } = React;

// DTF (Direct-to-Film) bosma chegaralari: maksimal kenglik 28 sm, balandlik chegarasiz
const DTF_MAX_WIDTH_CM = 28;

const PRODUCTS = [
  {
    id: 'tshirt',
    label: 'Futbolka',
    icon: '👕',
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=85',
    // Logo placement area (% of container) — defines the printable zone
    zone: { top: 32, left: 50, width: 26, height: 28 },
    // Real-world width of the printable zone (cm) — used to convert px ↔ cm
    zoneRealCm: 30,
    bg: '#E8E5E0',
    defaultSizeCm: 18,
  },
  {
    id: 'cap',
    label: 'Beysbolka',
    icon: '🧢',
    img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=85',
    zone: { top: 38, left: 50, width: 22, height: 16 },
    zoneRealCm: 12,
    bg: '#2C2C30',
    defaultSizeCm: 8,
  },
  {
    id: 'mug',
    label: 'Krujka',
    icon: '☕',
    img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&q=85',
    zone: { top: 45, left: 50, width: 22, height: 22 },
    zoneRealCm: 22,
    bg: '#F2EFEA',
    defaultSizeCm: 12,
  },
  {
    id: 'book',
    label: 'Kitob',
    icon: '📕',
    img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=900&q=85',
    zone: { top: 40, left: 50, width: 30, height: 22 },
    zoneRealCm: 21,
    bg: '#D9D2C5',
    defaultSizeCm: 14,
  },
];

const LS_KEY = 'humoprint_logo_v1';

function TryPage() {
  const [activeProduct, setActiveProduct] = useState('tshirt');
  const [logoDataUrl, setLogoDataUrl] = useState(null);
  const [logoSizeCm, setLogoSizeCm] = useState(18);
  const [logoOffsetX, setLogoOffsetX] = useState(0); // px on stage
  const [logoOffsetY, setLogoOffsetY] = useState(0);
  const [logoRotation, setLogoRotation] = useState(0); // degrees
  const [dragOver, setDragOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const stageRef = useRef(null);

  // Load logo from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) setLogoDataUrl(saved);
    } catch (e) {}
  }, []);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert("Iltimos, rasm faylini yuklang (PNG, JPG yoki SVG)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setLogoDataUrl(dataUrl);
      try { localStorage.setItem(LS_KEY, dataUrl); } catch (err) {
        console.warn('Could not save to localStorage', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => handleFile(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const clearLogo = () => {
    setLogoDataUrl(null);
    try { localStorage.removeItem(LS_KEY); } catch (e) {}
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const product = PRODUCTS.find(p => p.id === activeProduct) || PRODUCTS[0];

  // Reset offsets / size / rotation when product changes
  useEffect(() => {
    setLogoOffsetX(0); setLogoOffsetY(0); setLogoRotation(0);
    // Default size, capped by DTF limit
    setLogoSizeCm(Math.min(product.defaultSizeCm, DTF_MAX_WIDTH_CM));
  }, [activeProduct]);

  // Clamp current size if it exceeds the DTF limit (e.g. on first load)
  useEffect(() => {
    if (logoSizeCm > DTF_MAX_WIDTH_CM) setLogoSizeCm(DTF_MAX_WIDTH_CM);
  }, [logoSizeCm]);

  // --- Drag handlers ---
  const dragStateRef = useRef({ startX:0, startY:0, baseX:0, baseY:0 });

  const onLogoPointerDown = (e) => {
    if (!logoDataUrl) return;
    e.preventDefault();
    setIsDragging(true);
    const point = e.touches ? e.touches[0] : e;
    dragStateRef.current = {
      startX: point.clientX,
      startY: point.clientY,
      baseX: logoOffsetX,
      baseY: logoOffsetY,
    };
    const onMove = (ev) => {
      const p = ev.touches ? ev.touches[0] : ev;
      const dx = p.clientX - dragStateRef.current.startX;
      const dy = p.clientY - dragStateRef.current.startY;
      const stage = stageRef.current;
      if (!stage) return;
      const sw = stage.clientWidth;
      const sh = stage.clientHeight;
      // Clamp roughly so logo stays within stage
      const limX = sw * 0.45;
      const limY = sh * 0.45;
      setLogoOffsetX(Math.max(-limX, Math.min(limX, dragStateRef.current.baseX + dx)));
      setLogoOffsetY(Math.max(-limY, Math.min(limY, dragStateRef.current.baseY + dy)));
    };
    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
  };

  // Compute logo width % of stage based on size (cm) and product zone
  const logoWidthPct = (logoSizeCm / product.zoneRealCm) * product.zone.width;

  return (
    <div style={{ paddingTop: 72 }}>
      {/* Hero */}
      <section style={{ background:'#0F0F0F', padding:'80px 40px 60px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:24 }}>
            <div style={{ width:32,height:1.5,background:'#E85D26' }}/>
            <span style={{ fontFamily:'Space Mono,monospace',fontSize:11,letterSpacing:'0.15em',color:'#E85D26',textTransform:'uppercase' }}>Sinab ko'rish</span>
          </div>
          <h1 style={{ fontFamily:'Outfit,sans-serif',fontWeight:800,fontSize:'clamp(40px,5.5vw,72px)',letterSpacing:'-0.03em',color:'#fff',marginBottom:16 }}>
            Logotipingiz qanday ko'rinadi?
          </h1>
          <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:18,color:'rgba(255,255,255,0.5)',maxWidth:600,lineHeight:1.6 }}>
            Logotipingizni yuklang va u futbolka, krujka, kitob va beysbolkada qanday ko'rinishini ko'ring.
          </p>
        </div>
      </section>

      {/* Main canvas */}
      <section style={{ background:'#F5F0EB', padding:'60px 40px 100px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 380px', gap:48, alignItems:'start' }} className="try-grid">

          {/* Preview Stage */}
          <div>
            {/* Product tabs */}
            <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
              {PRODUCTS.map(p => (
                <button key={p.id} onClick={()=>setActiveProduct(p.id)} style={{
                  background: activeProduct===p.id ? '#0F0F0F' : '#fff',
                  color: activeProduct===p.id ? '#fff' : '#0F0F0F',
                  border:'none', cursor:'pointer',
                  borderRadius:100, padding:'12px 22px',
                  fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:14,
                  display:'flex', alignItems:'center', gap:8,
                  boxShadow: activeProduct===p.id ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
                  transition:'all 0.2s ease',
                }}>
                  <span style={{ fontSize:16 }}>{p.icon}</span>
                  {p.label}
                </button>
              ))}
            </div>

            {/* Stage */}
            <div ref={stageRef} style={{
              position:'relative', borderRadius:20, overflow:'hidden',
              aspectRatio:'4/3', background:product.bg,
              boxShadow:'0 8px 32px rgba(0,0,0,0.08)',
              userSelect:'none',
            }}>
              <img src={product.img} alt={product.label}
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', pointerEvents:'none' }}
                draggable={false}/>

              {/* Logo overlay (draggable) */}
              {logoDataUrl && (
                <div
                  onMouseDown={onLogoPointerDown}
                  onTouchStart={onLogoPointerDown}
                  style={{
                    position:'absolute',
                    top: `calc(${product.zone.top}% + ${logoOffsetY}px)`,
                    left: `calc(${product.zone.left}% + ${logoOffsetX}px)`,
                    transform: `translate(-50%, -50%) rotate(${logoRotation}deg)`,
                    width: `${logoWidthPct}%`,
                    height: `auto`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    transition: isDragging ? 'none' : 'width 0.15s ease, transform 0.15s ease',
                    touchAction:'none',
                    outline: isDragging ? '2px dashed rgba(232,93,38,0.7)' : 'none',
                    outlineOffset: 4,
                    borderRadius: 2,
                  }}>
                  <img src={logoDataUrl} alt="Logo"
                    draggable={false}
                    style={{
                      width:'100%', height:'auto', objectFit:'contain',
                      filter: product.id === 'cap' ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' : 'drop-shadow(0 1px 1px rgba(0,0,0,0.15))',
                      mixBlendMode: product.id === 'tshirt' || product.id === 'cap' ? 'normal' : 'multiply',
                      pointerEvents:'none',
                    }}/>
                </div>
              )}

              {/* Empty state placeholder */}
              {!logoDataUrl && (
                <div style={{
                  position:'absolute',
                  top: `${product.zone.top}%`,
                  left: `${product.zone.left}%`,
                  transform: 'translate(-50%, -50%)',
                  width: `${product.zone.width}%`,
                  height: `${product.zone.height}%`,
                  border:'2px dashed rgba(232,93,38,0.7)',
                  borderRadius:8,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background:'rgba(232,93,38,0.08)',
                  backdropFilter:'blur(4px)',
                }}>
                  <span style={{
                    fontFamily:'Space Mono,monospace', fontSize:11,
                    color:'#E85D26', letterSpacing:'0.1em', textTransform:'uppercase',
                    textAlign:'center', padding:'0 8px',
                  }}>
                    Logo zonasi
                  </span>
                </div>
              )}

              {/* Drag hint pill */}
              {logoDataUrl && !isDragging && (
                <div style={{
                  position:'absolute', top:16, left:16,
                  background:'rgba(15,15,15,0.75)', backdropFilter:'blur(8px)',
                  padding:'6px 12px', borderRadius:100,
                  fontFamily:'DM Sans,sans-serif', fontSize:11, color:'rgba(255,255,255,0.85)',
                  display:'flex', alignItems:'center', gap:6,
                  pointerEvents:'none',
                }}>
                  <span>✥</span> Sudrab joylashtiring
                </div>
              )}

              {/* Watermark */}
              <div style={{
                position:'absolute', bottom:16, right:16,
                background:'rgba(15,15,15,0.7)', backdropFilter:'blur(8px)',
                padding:'6px 10px', borderRadius:6,
                fontFamily:'Space Mono,monospace', fontSize:10, color:'rgba(255,255,255,0.7)',
                letterSpacing:'0.08em',
                pointerEvents:'none',
              }}>
                humo<span style={{color:'#E85D26'}}>print</span> mockup
              </div>
            </div>

            {/* Real-size indicator */}
            <div style={{
              marginTop:14, padding:'10px 14px',
              background:'#fff', borderRadius:10,
              display:'flex', alignItems:'center', justifyContent:'space-between',
              gap:12, flexWrap:'wrap',
              boxShadow:'0 1px 4px rgba(0,0,0,0.05)',
            }}>
              <span style={{ fontFamily:'DM Sans,sans-serif',fontSize:13,color:'#6B6B6B' }}>
                💡 Bu taxminiy ko'rinish. Bosma zonasi: <strong style={{color:'#0F0F0F'}}>{product.zoneRealCm}sm</strong> kenglikda.
              </span>
              {logoDataUrl && (
                <span style={{
                  fontFamily:'Space Mono,monospace',fontSize:11,
                  color:'#E85D26',background:'rgba(232,93,38,0.1)',
                  padding:'4px 10px',borderRadius:100,letterSpacing:'0.05em',
                }}>
                  Logo: {logoSizeCm}sm · {logoRotation}°
                </span>
              )}
            </div>
          </div>

          {/* Controls Panel */}
          <div style={{ display:'flex', flexDirection:'column', gap:16, position:'sticky', top:88 }}>

            {/* Upload zone */}
            <div
              onDragOver={(e)=>{e.preventDefault();setDragOver(true);}}
              onDragLeave={()=>setDragOver(false)}
              onDrop={handleDrop}
              onClick={()=>fileInputRef.current?.click()}
              style={{
                background: dragOver ? 'rgba(232,93,38,0.04)' : '#fff',
                borderRadius:16, padding:24,
                border: dragOver ? '2px dashed #E85D26' : '2px dashed rgba(0,0,0,0.12)',
                cursor:'pointer', transition:'border 0.2s, background 0.2s',
                textAlign:'center',
              }}>
              <input ref={fileInputRef} type="file" accept="image/*"
                style={{display:'none'}} onChange={handleInputChange}/>

              {logoDataUrl ? (
                <div>
                  <div style={{
                    width:80, height:80, margin:'0 auto 12px',
                    background:'#F5F0EB', borderRadius:12,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    overflow:'hidden', padding:8,
                  }}>
                    <img src={logoDataUrl} alt="Your logo"
                      style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain'}}/>
                  </div>
                  <p style={{ fontFamily:'DM Sans,sans-serif',fontWeight:600,fontSize:14,color:'#0F0F0F',marginBottom:4 }}>
                    Logotip yuklandi ✓
                  </p>
                  <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:12,color:'#6B6B6B' }}>
                    Bosing — boshqa fayl tanlash uchun
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize:36, marginBottom:10 }}>📎</div>
                  <p style={{ fontFamily:'Outfit,sans-serif',fontWeight:600,fontSize:15,color:'#0F0F0F',marginBottom:6 }}>
                    Logotipingizni yuklang
                  </p>
                  <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:13,color:'#6B6B6B',lineHeight:1.5 }}>
                    Bosing yoki bu yerga sudrab tashlang<br/>
                    <span style={{fontSize:11,color:'#999'}}>PNG, JPG, SVG · maks. 5MB</span>
                  </p>
                </div>
              )}
            </div>

            {/* Adjustment controls */}
            {logoDataUrl && (
              <div style={{
                background:'#fff', borderRadius:16, padding:24,
                boxShadow:'0 2px 12px rgba(0,0,0,0.05)',
              }}>
                <p style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:13,letterSpacing:'0.08em',color:'#6B6B6B',textTransform:'uppercase',marginBottom:18 }}>
                  Sozlash
                </p>

                <Slider label="O'lcham (kenglik)" value={logoSizeCm}
                  min={3}
                  max={Math.min(Math.round(product.zoneRealCm * 1.2), DTF_MAX_WIDTH_CM)}
                  step={0.5}
                  suffix="sm" decimals={1}
                  onChange={setLogoSizeCm}/>

                <div style={{
                  background:'rgba(0,0,0,0.04)', borderRadius:8, padding:'8px 12px',
                  marginTop:-10, marginBottom:14,
                  display:'flex', alignItems:'center', gap:8,
                }}>
                  <span style={{fontSize:13}}>ℹ️</span>
                  <span style={{fontFamily:'DM Sans,sans-serif',fontSize:11,color:'#6B6B6B',lineHeight:1.4 }}>
                    DTF bosma: maks. kenglik <strong style={{color:'#0F0F0F'}}>{DTF_MAX_WIDTH_CM} sm</strong>, balandlik chegarasiz
                  </span>
                </div>

                <Slider label="Aylantirish" value={logoRotation}
                  min={-180} max={180} step={1} suffix="°"
                  onChange={setLogoRotation}/>

                {/* Quick rotation buttons */}
                <div style={{ display:'flex',gap:6,marginTop:-8,marginBottom:14 }}>
                  {[0, 90, -90, 180].map(deg => (
                    <button key={deg} onClick={()=>setLogoRotation(deg)} style={{
                      flex:1, background: logoRotation===deg ? '#0F0F0F' : '#F5F0EB',
                      color: logoRotation===deg ? '#fff' : '#6B6B6B',
                      border:'none', cursor:'pointer',
                      borderRadius:6, padding:'6px 8px',
                      fontFamily:'Space Mono,monospace', fontSize:11,
                      transition:'all 0.15s',
                    }}>{deg}°</button>
                  ))}
                </div>

                <div style={{
                  background:'rgba(232,93,38,0.08)', borderRadius:8, padding:'10px 12px',
                  marginBottom:14, display:'flex', alignItems:'center', gap:8,
                }}>
                  <span style={{fontSize:14}}>✥</span>
                  <span style={{fontFamily:'DM Sans,sans-serif',fontSize:12,color:'#0F0F0F',lineHeight:1.4 }}>
                    Logotipni preview ustida sudrab joylashtirishingiz mumkin
                  </span>
                </div>

                <button onClick={()=>{
                  setLogoSizeCm(product.defaultSizeCm);
                  setLogoOffsetX(0); setLogoOffsetY(0); setLogoRotation(0);
                }} style={{
                  background:'none', border:'1px solid rgba(0,0,0,0.12)',
                  borderRadius:8, padding:'8px 14px', width:'100%',
                  cursor:'pointer', fontFamily:'DM Sans,sans-serif',
                  fontSize:13, color:'#6B6B6B',
                  transition:'border 0.2s, color 0.2s',
                }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='#E85D26';e.currentTarget.style.color='#E85D26';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(0,0,0,0.12)';e.currentTarget.style.color='#6B6B6B';}}
                >Sozlamalarni tiklash</button>
              </div>
            )}

            {/* Action card */}
            <div style={{ background:'#0F0F0F', borderRadius:16, padding:24, color:'#fff' }}>
              <div style={{ fontFamily:'Outfit,sans-serif',fontWeight:700,fontSize:17,marginBottom:8 }}>
                Yoqdimi? 🎉
              </div>
              <p style={{ fontFamily:'DM Sans,sans-serif',fontSize:14,color:'rgba(255,255,255,0.55)',lineHeight:1.6,marginBottom:16 }}>
                Bu mahsulotni real hayotda buyurtma qilish uchun pastdagi tugmani bosing.
              </p>
              <button onClick={()=>{ window.dispatchEvent(new CustomEvent('humoprint:nav', {detail:'order'})); }} style={{
                background:'#E85D26', color:'#fff', border:'none', cursor:'pointer',
                borderRadius:100, padding:'12px 22px', width:'100%',
                fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:14,
                transition:'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.02)';e.currentTarget.style.boxShadow='0 8px 22px rgba(232,93,38,0.4)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='none';}}
              >Buyurtma berish →</button>
            </div>

            {logoDataUrl && (
              <button onClick={clearLogo} style={{
                background:'none', border:'none', cursor:'pointer',
                fontFamily:'DM Sans,sans-serif', fontSize:13, color:'#6B6B6B',
                textDecoration:'underline', textAlign:'center', padding:'4px',
              }}>Logotipni o'chirish</button>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}

function Slider({ label, value, min, max, step=1, suffix, decimals=0, onChange }) {
  const display = decimals > 0 ? Number(value).toFixed(decimals) : Math.round(value);
  return (
    <div style={{ marginBottom:18 }}>
      <div style={{ display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:6 }}>
        <label style={{ fontFamily:'DM Sans,sans-serif',fontSize:13,fontWeight:500,color:'#0F0F0F' }}>{label}</label>
        <span style={{ fontFamily:'Space Mono,monospace',fontSize:12,color:'#E85D26' }}>{display}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e=>onChange(Number(e.target.value))}
        style={{ width:'100%', accentColor:'#E85D26', cursor:'pointer' }}/>
    </div>
  );
}

Object.assign(window, { TryPage });
