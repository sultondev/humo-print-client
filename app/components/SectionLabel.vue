<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <div class="flex items-center gap-3 mb-4">
    <div class="w-8 h-[1.5px] bg-accent flex-shrink-0" />
    <span class="font-mono text-[11px] tracking-[0.15em] text-accent uppercase">{{ text }}</span>
  </div>
</template>
