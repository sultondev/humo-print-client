<script setup lang="ts">
defineProps<{
  img: string
  title: string
  cat: string
}>()

const hovered = ref(false)
</script>

<template>
  <div
    class="rounded-xl overflow-hidden relative cursor-pointer"
    style="aspect-ratio: 4/3;"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <img
      :src="img"
      :alt="title"
      class="w-full h-full object-cover block transition-transform duration-500"
      :class="hovered ? 'scale-[1.06]' : 'scale-100'"
    />
    <div
      class="absolute inset-0 flex flex-col justify-end p-5 transition-all duration-[350ms]"
      :class="hovered ? 'bg-[rgba(15,15,15,0.75)]' : 'bg-[rgba(15,15,15,0)]'"
    >
      <div
        class="transition-all duration-300"
        :class="hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5'"
        style="transition-delay: 50ms;"
      >
        <div class="font-mono text-[10px] text-accent tracking-[0.1em] uppercase mb-1.5">{{ cat }}</div>
        <div class="font-outfit font-bold text-lg text-white">{{ title }}</div>
      </div>
    </div>
  </div>
</template>
