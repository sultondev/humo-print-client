<script setup lang="ts">
const socialIcons = {
  instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`,
  telegram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.01 9.475c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.393c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.873.747z"/></svg>`,
  facebook: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
}

const pageLinks = [
  { path: '/', label: 'Bosh sahifa' },
  { path: '/services', label: 'Xizmatlar' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/order', label: 'Buyurtma' },
  { path: '/contact', label: 'Aloqa' },
]

const serviceLinks = ['Ofset bosma', 'Raqamli bosma', 'Souvenir', 'Banner', 'Qadoqlash', 'Dizayn']

const contactItems = [
  { icon: '📍', val: "Toshkent sh., Yakkasaroy tumani" },
  { icon: '📞', val: '+998 99 123 45 67' },
  { icon: '✉️', val: 'info@humoprint.uz' },
  { icon: '💬', val: '@humoprint_uz' },
  { icon: '🕐', val: 'Du–Ju: 9:00–18:00' },
]
</script>

<template>
  <footer class="bg-dark text-white pt-20">
    <div class="max-w-[1200px] mx-auto px-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">

        <!-- Brand -->
        <div>
          <AppLogo class="mb-4" />
          <p class="font-sans text-sm text-white/50 leading-relaxed mb-6">
            Sifatli bosma — ishonchli hamkor.
          </p>
          <div class="flex gap-3">
            <a
              v-for="(icon, name) in socialIcons"
              :key="name"
              href="#"
              class="w-9 h-9 rounded-lg bg-white/[0.07] flex items-center justify-center text-white/60 transition-all duration-200 hover:bg-accent hover:text-white"
              :aria-label="name"
              v-html="icon"
            />
          </div>
        </div>

        <!-- Pages -->
        <div>
          <p class="font-outfit font-semibold text-[13px] tracking-[0.1em] text-white/35 uppercase mb-5">
            Sahifalar
          </p>
          <NuxtLink
            v-for="link in pageLinks"
            :key="link.path"
            :to="link.path"
            class="block font-sans text-sm text-white/55 py-1.5 transition-colors duration-200 hover:text-accent no-underline"
          >
            {{ link.label }}
          </NuxtLink>
        </div>

        <!-- Services -->
        <div>
          <p class="font-outfit font-semibold text-[13px] tracking-[0.1em] text-white/35 uppercase mb-5">
            Xizmatlar
          </p>
          <NuxtLink
            v-for="service in serviceLinks"
            :key="service"
            to="/services"
            class="block font-sans text-sm text-white/55 py-1.5 transition-colors duration-200 hover:text-accent no-underline"
          >
            {{ service }}
          </NuxtLink>
        </div>

        <!-- Contact -->
        <div>
          <p class="font-outfit font-semibold text-[13px] tracking-[0.1em] text-white/35 uppercase mb-5">
            Aloqa
          </p>
          <div
            v-for="(item, i) in contactItems"
            :key="i"
            class="flex gap-2.5 items-start mb-3"
          >
            <span class="text-sm mt-0.5">{{ item.icon }}</span>
            <span class="font-sans text-sm text-white/55 leading-relaxed">{{ item.val }}</span>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/[0.08] py-6 text-center">
        <p class="font-sans text-[13px] text-white/30">
          © 2026 humoprint. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  </footer>
</template>
