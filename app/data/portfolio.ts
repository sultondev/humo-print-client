export interface PortfolioItem {
  img: string
  title: string
  cat: string
  desc: string
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=700&q=80',
    title: 'Korporativ vizitka',
    cat: 'Vizitka',
    desc: "100% ekologik qog'ozda yuqori sifatli ofset bosma.",
  },
  {
    img: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=700&q=80',
    title: 'Brendlangan krujka',
    cat: 'Souvenir',
    desc: 'Sublimatsiya usulida chop etilgan brendlangan krujkalar.',
  },
  {
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
    title: "Moda do'koni banneri",
    cat: 'Banner',
    desc: '3×6 metrli tashqi reklama banneri.',
  },
  {
    img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=700&q=80',
    title: 'Mahsulot qadoqlash',
    cat: 'Qadoqlash',
    desc: 'Brendlangan karton quti, maxsus litografiya.',
  },
  {
    img: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=700&q=80',
    title: 'Yillik hisobot',
    cat: 'Katalog',
    desc: "64 betli to'liq rangli ofset katalog.",
  },
  {
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&q=80',
    title: "Stiker to'plami",
    cat: 'Stiker',
    desc: "Vinilli suv o'tkazmaydigan stikerlar.",
  },
  {
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=80',
    title: 'Notarial vizitka',
    cat: 'Vizitka',
    desc: 'Zarhal bosma, premium karton.',
  },
  {
    img: 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=700&q=80',
    title: 'Restoran menyu',
    cat: 'Katalog',
    desc: 'A4 laminated menyu, 24 bet.',
  },
  {
    img: 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=700&q=80',
    title: "Sovg'a quti",
    cat: 'Qadoqlash',
    desc: 'Maxsus shaklda kesib chiqarilgan sovga quti.',
  },
  {
    img: 'https://images.unsplash.com/photo-1513506003901-1e6a35082a5f?w=700&q=80',
    title: 'Roll-up banner',
    cat: 'Banner',
    desc: '85×200 sm pull-up banner, alyumin konstruktsiya.',
  },
  {
    img: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?w=700&q=80',
    title: 'Promo futbolka',
    cat: 'Souvenir',
    desc: "DTG texnologiyasi bilan to'g'ridan-to'g'ri bosma.",
  },
  {
    img: 'https://images.unsplash.com/photo-1558618047-f4e90e8f3e1a?w=700&q=80',
    title: 'Flayer dizayni',
    cat: 'Stiker',
    desc: "A5 o'lchamida raqamli bosma flayer.",
  },
]

export const PORTFOLIO_FILTERS = ['Barchasi', 'Vizitka', 'Katalog', 'Banner', 'Souvenir', 'Qadoqlash', 'Stiker']
