<script setup lang="ts">
const props = withDefaults(defineProps<{
  delay?: number
}>(), { delay: 0 })

const { el, visible } = useReveal()
</script>

<template>
  <div
    ref="el"
    :style="{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s ease ${props.delay}ms, transform 0.7s ease ${props.delay}ms`,
    }"
  >
    <slot />
  </div>
</template>
