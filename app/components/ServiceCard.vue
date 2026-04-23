<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  desc: string
}>()

const hovered = ref(false)
</script>

<template>
  <div
    class="bg-white rounded-2xl p-8 cursor-default transition-all duration-[250ms] ease-out"
    :class="hovered ? 'shadow-[0_20px_48px_rgba(0,0,0,0.12)] -translate-y-1.5' : 'shadow-[0_2px_12px_rgba(0,0,0,0.06)]'"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="text-[32px] mb-5">{{ icon }}</div>
    <h3 class="font-outfit font-bold text-xl text-dark mb-2.5">{{ title }}</h3>
    <p class="font-sans text-[15px] text-muted leading-relaxed">{{ desc }}</p>
  </div>
</template>
