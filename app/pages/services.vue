<script setup lang="ts">
import { SERVICE_STATIC } from '~/data/services'

const { t, tm, rt } = useI18n()
const localePath = useLocalePath()

useSeoMeta({ title: computed(() => `${t('services.page_title')} — humoprint`) })

interface ServiceLocale { title: string; desc: string; products: string[] }
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
  <div>
    <PageHero
      :label="t('services.label')"
      :title="t('services.page_title')"
      :subtitle="t('services.page_subtitle')"
    />

    <div>
      <ServicesServiceRow
        v-for="(service, i) in services"
        :key="service.title"
        :service="service"
        :idx="i"
      />
    </div>
  </div>
</template>
