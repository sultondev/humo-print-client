<script setup lang="ts">
const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { path: '/', label: 'Bosh sahifa' },
  { path: '/services', label: 'Xizmatlar' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/contact', label: 'Aloqa' },
]

const isActive = (path: string) =>
  path === '/' ? route.path === '/' : route.path.startsWith(path)

const handleScroll = () => {
  scrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

watch(() => route.path, () => {
  menuOpen.value = false
  document.body.style.overflow = ''
})
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-[1000] px-10 flex items-center justify-between transition-all duration-300"
    style="height: 72px;"
    :class="scrolled
      ? 'bg-[rgba(15,15,15,0.96)] backdrop-blur-[16px] border-b border-white/[0.06]'
      : 'bg-transparent border-b border-transparent'"
  >
    <AppLogo />

    <!-- Desktop nav -->
    <nav class="hidden lg:flex gap-9 items-center">
      <NuxtLink
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        class="font-sans text-[15px] font-medium transition-colors duration-200 pb-0.5 border-b-[1.5px] no-underline"
        :class="isActive(link.path)
          ? 'text-accent border-accent'
          : 'text-white/75 border-transparent hover:text-white'"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>

    <!-- CTA + hamburger -->
    <div class="flex items-center gap-4">
      <NuxtLink
        to="/order"
        class="hidden lg:inline-flex bg-accent text-white rounded-full px-6 py-2.5 font-sans font-semibold text-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(232,93,38,0.4)] no-underline"
      >
        Buyurtma berish
      </NuxtLink>

      <button
        class="lg:hidden flex flex-col gap-[5px] items-center justify-center p-2"
        aria-label="Menyuni ochish"
        @click="menuOpen = !menuOpen"
      >
        <span
          class="block w-6 h-0.5 bg-white transition-all duration-300 origin-center"
          :class="menuOpen ? 'rotate-45 translate-y-[7px]' : ''"
        />
        <span
          class="block w-6 h-0.5 bg-white transition-all duration-300"
          :class="menuOpen ? 'opacity-0' : 'opacity-100'"
        />
        <span
          class="block w-6 h-0.5 bg-white transition-all duration-300 origin-center"
          :class="menuOpen ? '-rotate-45 -translate-y-[7px]' : ''"
        />
      </button>
    </div>
  </header>

  <!-- Mobile menu overlay -->
  <div
    class="fixed inset-0 z-[999] bg-dark flex flex-col items-center justify-center gap-10 transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
    :class="menuOpen ? 'translate-x-0' : 'translate-x-full'"
    aria-hidden="!menuOpen"
  >
    <NuxtLink
      v-for="link in links"
      :key="link.path"
      :to="link.path"
      class="font-outfit font-bold text-[36px] tracking-tight transition-colors duration-200 no-underline"
      :class="isActive(link.path) ? 'text-accent' : 'text-white'"
    >
      {{ link.label }}
    </NuxtLink>
    <NuxtLink
      to="/order"
      class="mt-4 bg-accent text-white rounded-full px-10 py-4 font-sans font-bold text-lg no-underline"
    >
      Buyurtma berish →
    </NuxtLink>
  </div>
</template>
