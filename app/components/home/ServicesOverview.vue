<script setup lang="ts">
import { SERVICE_STATIC } from '~/data/services'

const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

interface ServiceLocale {
  title: string
  desc: string
  products: string[]
}

const services = computed(() => {
  const locale = tm('services.items') as ServiceLocale[]
  return SERVICE_STATIC.map((s, i) => {
    const l = locale[i]
    return {
      ...s,
      title: rt(l.title),
      desc: rt(l.desc),
      products: (l.products as unknown[]).map(p => rt(p as string)),
    }
  })
})
</script>

<template>
  <section class="bg-cream px-10 py-[120px]">
    <div class="max-w-300 mx-auto">
      <FadeUp>
        <SectionLabel :text="t('services.label')" />
        <h2
          class="font-outfit font-extrabold text-dark mb-16"
          style="font-size: clamp(36px, 4vw, 56px); letter-spacing: -0.03em;"
        >
          {{ t('services.heading') }}
        </h2>
      </FadeUp>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FadeUp
          v-for="(service, i) in services"
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
          :to="localePath('/services')"
          class="inline-flex items-center gap-2 font-sans font-semibold text-base text-accent no-underline transition-all duration-200 hover:gap-3.5"
        >
          {{ t('common.see_all') }}
        </NuxtLink>
      </FadeUp>
    </div>
  </section>
</template>
