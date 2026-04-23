<script setup lang="ts">
import { SERVICES } from '~/data/services'
</script>

<template>
  <section class="bg-cream px-10 py-[120px]">
    <div class="max-w-300 mx-auto">
      <FadeUp>
        <SectionLabel text="Xizmatlar" />
        <h2
          class="font-outfit font-extrabold text-dark mb-16"
          style="font-size: clamp(36px, 4vw, 56px); letter-spacing: -0.03em;"
        >
          Biz nima qilamiz
        </h2>
      </FadeUp>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FadeUp
          v-for="(service, i) in SERVICES"
          :key="service.title"
          :delay="i * 80"
        >
          <ServiceCard
            :icon="service.icon"
            :title="service.title"
            :desc="service.desc"
          />
        </FadeUp>
      </div>

      <FadeUp class="text-center mt-12">
        <NuxtLink
          to="/services"
          class="inline-flex items-center gap-2 font-sans font-semibold text-base text-accent no-underline transition-all duration-200 hover:gap-3.5"
        >
          Barchasini ko'rish →
        </NuxtLink>
      </FadeUp>
    </div>
  </section>
</template>
