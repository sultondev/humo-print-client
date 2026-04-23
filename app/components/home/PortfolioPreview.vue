<script setup lang="ts">
import { PORTFOLIO_ITEMS } from '~/data/portfolio'

const filters = ['Barchasi', 'Bosma', 'Souvenir', 'Qadoqlash', 'Banner']
const activeFilter = ref('Barchasi')

const preview = PORTFOLIO_ITEMS.slice(0, 6)
</script>

<template>
  <section class="bg-dark px-10 py-[120px]">
    <div class="max-w-[1200px] mx-auto">
      <FadeUp>
        <SectionLabel text="Portfolio" />
        <div class="flex justify-between items-end flex-wrap gap-6 mb-10">
          <h2
            class="font-outfit font-extrabold text-white"
            style="font-size: clamp(36px, 4vw, 56px); letter-spacing: -0.03em;"
          >
            So'nggi ishlarimiz
          </h2>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="f in filters"
              :key="f"
              class="font-sans text-[13px] font-medium px-4 py-2 border-b-[1.5px] bg-transparent border-none cursor-pointer transition-colors duration-200"
              :class="activeFilter === f
                ? 'text-accent border-b-accent border-solid'
                : 'text-white/40 border-b-transparent hover:text-white/70'"
              style="border-bottom-style: solid;"
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
          <PortfolioThumb
            :img="item.img"
            :title="item.title"
            :cat="item.cat"
          />
        </FadeUp>
      </div>

      <FadeUp class="text-center mt-12">
        <NuxtLink
          to="/portfolio"
          class="inline-flex items-center gap-2 font-sans font-semibold text-base text-accent no-underline transition-all duration-200 hover:gap-3.5"
        >
          Barcha ishlarni ko'rish →
        </NuxtLink>
      </FadeUp>
    </div>
  </section>
</template>
