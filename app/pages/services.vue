<script setup lang="ts">
import { SERVICES } from '~/data/services'

useSeoMeta({ title: 'Xizmatlar — humoprint' })
</script>

<template>
  <div>
    <PageHero
      label="Xizmatlar"
      title="Xizmatlarimiz"
      subtitle="Har qanday bosma ehtiyojingiz uchun professional yechimlar."
    />

    <div>
      <ServicesServiceRow
        v-for="(service, i) in SERVICES"
        :key="service.title"
        :service="service"
        :idx="i"
      />
    </div>
  </div>
</template>
