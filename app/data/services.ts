export interface Service {
  icon: string
  title: string
  desc: string
  img: string
  products: string[]
  reverse?: boolean
}

export const SERVICES: Service[] = [
  {
    icon: '🖨',
    title: 'Ofset bosma',
    desc: 'Katalog, jurnal, buklet — katta tirajda sifatli bosma.',
    img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
    products: ['Katalog', 'Jurnal', 'Buklet', 'Kitob', 'Plakat'],
  },
  {
    icon: '⚡',
    title: 'Raqamli bosma',
    desc: 'Vizitka, flayer, stiker — tez va sifatli.',
    img: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
    products: ['Vizitka', 'Flayer', 'Stiker', 'Pochta kartasi', 'Menyu'],
    reverse: true,
  },
  {
    icon: '🎁',
    title: 'Souvenir mahsulotlar',
    desc: "Krujka, futbolka, qalam va boshqa brendlangan sovg'alar.",
    img: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80',
    products: ['Krujka', 'Futbolka', 'Qalam', 'Daftar', 'USB flesh'],
  },
  {
    icon: '🚩',
    title: 'Banner va tashqi reklama',
    desc: "Katta formatdagi bannerlar, bilbordlar, ko'cha reklamalari.",
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    products: ['Bannerlar', 'Bilbord', 'Roll-up', 'Vitrina', 'Вывеска'],
    reverse: true,
  },
  {
    icon: '📦',
    title: 'Qadoqlash',
    desc: 'Brendlangan quti, paket va maxsus qadoqlash yechimlari.',
    img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
    products: ['Quti', 'Paket', 'Lenta', 'Stiker', 'Maxsus forma'],
  },
  {
    icon: '✏️',
    title: 'Dizayn xizmati',
    desc: "Professional grafik dizayn — logotipdan to katalogga qadar.",
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    products: ['Logotip', 'Korporativ uslub', 'Reklama', 'Qadoqlash dizayni', 'Katalog'],
    reverse: true,
  },
]
