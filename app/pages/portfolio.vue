<script setup lang="ts">
import { PORTFOLIO_ITEMS, PORTFOLIO_FILTERS, type PortfolioItem } from '~/data/portfolio'

useSeoMeta({ title: 'Portfolio — humoprint' })

const activeFilter = ref('Barchasi')
const shown = ref(6)
const lightbox = ref<PortfolioItem | null>(null)

const filtered = computed(() =>
  activeFilter.value === 'Barchasi'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.cat === activeFilter.value),
)

const visible = computed(() => filtered.value.slice(0, shown.value))

const setFilter = (f: string) => {
  activeFilter.value = f
  shown.value = 6
}

const openLightbox = (item: PortfolioItem) => {
  lightbox.value = item
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightbox.value = null
  document.body.style.overflow = ''
}

onUnmounted(() => { document.body.style.overflow = '' })
</script>

<template>
  <div>
    <PageHero
      label="Portfolio"
      title="Bizning ishlarimiz"
      subtitle="Yuzlab mijozlar uchun yaratilgan sifatli bosma mahsulotlar."
    />

    <!-- Sticky filter bar -->
    <div
      class="bg-white sticky z-[100] border-b border-black/[0.07]"
      style="top: 72px;"
    >
      <div class="max-w-[1200px] mx-auto px-10 flex gap-0 overflow-x-auto">
        <button
          v-for="f in PORTFOLIO_FILTERS"
          :key="f"
          class="font-sans text-sm font-medium whitespace-nowrap bg-transparent border-none cursor-pointer border-b-2 transition-colors duration-200"
          style="padding: 20px;"
          :class="activeFilter === f
            ? 'text-accent border-b-accent'
            : 'text-muted border-b-transparent hover:text-dark'"
          :style="{ borderBottomStyle: 'solid' }"
          @click="setFilter(f)"
        >
          {{ f }}
        </button>
      </div>
    </div>

    <!-- Grid -->
    <section class="bg-cream px-10 pt-[60px] pb-20">
      <div class="max-w-[1200px] mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(item, i) in visible"
            :key="item.title + i"
            class="cursor-pointer"
            @click="openLightbox(item)"
          >
            <PortfolioCardFull
              :img="item.img"
              :title="item.title"
              :cat="item.cat"
            />
          </div>
        </div>

        <div v-if="shown < filtered.length" class="text-center mt-12">
          <button
            class="bg-dark text-white rounded-full font-sans font-semibold text-[15px] cursor-pointer border-none transition-colors duration-200 hover:bg-accent"
            style="padding: 16px 40px;"
            @click="shown += 6"
          >
            Ko'proq ko'rish
          </button>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightbox"
        class="fixed inset-0 z-[2000] flex items-center justify-center p-10"
        style="background: rgba(0,0,0,0.88);"
        @click.self="closeLightbox"
      >
        <div class="bg-white rounded-2xl overflow-hidden max-w-[800px] w-full grid grid-cols-1 md:grid-cols-2">
          <img
            :src="lightbox.img"
            :alt="lightbox.title"
            class="w-full h-full object-cover block"
            style="min-height: 360px;"
          />
          <div class="p-10 flex flex-col justify-between">
            <div>
              <span class="font-mono text-[10px] text-accent tracking-[0.1em] uppercase">
                {{ lightbox.cat }}
              </span>
              <h3
                class="font-outfit font-extrabold text-dark mt-3 mb-4"
                style="font-size: 28px; letter-spacing: -0.02em;"
              >
                {{ lightbox.title }}
              </h3>
              <p class="font-sans text-[15px] text-muted leading-relaxed">{{ lightbox.desc }}</p>
            </div>
            <div>
              <NuxtLink
                to="/order"
                class="block w-full text-center bg-accent text-white rounded-full font-sans font-semibold text-[15px] no-underline mb-3 hover:opacity-90 transition-opacity"
                style="padding: 14px 28px;"
                @click="closeLightbox"
              >
                Shunga o'xshash buyurtma berish
              </NuxtLink>
              <button
                class="w-full bg-transparent text-muted border border-[#ddd] rounded-full font-sans font-medium text-sm cursor-pointer hover:border-dark transition-colors"
                style="padding: 12px 28px;"
                @click="closeLightbox"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
