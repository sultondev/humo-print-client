<script setup lang="ts">
import type { Service } from '~/data/services'

defineProps<{
  service: Service
  idx: number
}>()

const { el, visible } = useReveal(0.1)
</script>

<template>
  <div
    ref="el"
    class="px-10 py-[100px] transition-all duration-700 ease-out"
    :class="[
      idx % 2 === 0 ? 'bg-white' : 'bg-cream',
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7',
    ]"
  >
    <div
      class="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
      :style="service.reverse ? 'direction: rtl;' : ''"
    >
      <!-- Image -->
      <div class="rounded-xl overflow-hidden" style="direction: ltr; aspect-ratio: 4/3;">
        <img
          :src="service.img"
          :alt="service.title"
          class="w-full h-full object-cover block"
        />
      </div>

      <!-- Text -->
      <div style="direction: ltr;">
        <h2
          class="font-outfit font-extrabold text-dark mb-4"
          style="font-size: clamp(32px, 3vw, 48px); letter-spacing: -0.03em;"
        >
          {{ service.title }}
        </h2>
        <p class="font-sans text-[17px] text-muted leading-[1.75] mb-7">{{ service.desc }}</p>

        <div class="flex flex-wrap gap-2 mb-9">
          <span
            v-for="product in service.products"
            :key="product"
            class="font-sans text-[13px] font-medium text-dark bg-accent/10 rounded-full px-3.5 py-1.5"
          >
            {{ product }}
          </span>
        </div>

        <NuxtLink
          to="/order"
          class="inline-flex bg-accent text-white rounded-full font-sans font-semibold text-[15px] no-underline transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(232,93,38,0.35)]"
          style="padding: 14px 28px;"
        >
          Buyurtma berish →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
