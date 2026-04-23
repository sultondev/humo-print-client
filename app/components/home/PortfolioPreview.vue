<script setup lang="ts">
import { PORTFOLIO_IMGS } from '~/data/portfolio'

const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

interface PortfolioLocale {
  title: string
  cat: string
  desc: string
}

const activeFilter = ref('')

const filters = computed(() => (tm('portfolio.preview_filters') as string[]).map(f => rt(f)))
const allItems = computed(() => {
  const locale = tm('portfolio.items') as PortfolioLocale[]
  return locale.map((item, i) => ({
    title: rt(item.title),
    cat: rt(item.cat),
    desc: rt(item.desc),
    img: PORTFOLIO_IMGS[i] ?? '',
  }))
})

const preview = computed(() => allItems.value.slice(0, 6))

watch(filters, (f) => {
  if (!activeFilter.value && f.length) activeFilter.value = f[0]
}, { immediate: true })
</script>

<template>
  <section class="bg-dark px-10 py-[120px]">
    <div class="max-w-300 mx-auto">
      <FadeUp>
        <SectionLabel :text="t('portfolio.label')" />
        <div class="flex justify-between items-end flex-wrap gap-6 mb-10">
          <h2
            class="font-outfit font-extrabold text-white"
            style="font-size: clamp(36px, 4vw, 56px); letter-spacing: -0.03em;"
          >
            {{ t('portfolio.heading') }}
          </h2>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="f in filters"
              :key="f"
              class="font-sans text-[13px] font-medium px-4 py-2 bg-transparent border-none cursor-pointer transition-colors duration-200 border-b-2"
              :class="activeFilter === f
                ? 'text-accent'
                : 'text-white/40 hover:text-white/70'"
              :style="{ borderBottomColor: activeFilter === f ? '#E85D26' : 'transparent', borderBottomStyle: 'solid' }"
              @click="activeFilter = f"
            >
              {{ f }}
            </button>
          </div>
        </div>
      </FadeUp>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <FadeUp
          v-for="(item, i) in preview"
          :key="item.title"
          :delay="i * 60"
        >
          <PortfolioThumb :img="item.img" :title="item.title" :cat="item.cat" />
        </FadeUp>
      </div>

      <FadeUp class="text-center mt-12">
        <NuxtLink
          :to="localePath('/portfolio')"
          class="inline-flex items-center gap-2 font-sans font-semibold text-base text-accent no-underline transition-all duration-200 hover:gap-3.5"
        >
          {{ t('common.see_works') }}
        </NuxtLink>
      </FadeUp>
    </div>
  </section>
</template>
