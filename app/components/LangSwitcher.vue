<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="flex items-center gap-1">
    <NuxtLink
      v-for="loc in locales"
      :key="loc.code"
      :to="switchLocalePath(loc.code)"
      class="font-mono text-[11px] font-bold px-2 py-1 rounded border transition-all duration-150 no-underline"
      :class="locale === loc.code
        ? 'text-accent border-accent'
        : 'text-white/40 border-transparent hover:text-white/70 hover:border-white/20'"
    >
      {{ loc.code.toUpperCase() }}
    </NuxtLink>
  </div>
</template>
