<script setup lang="ts">
defineProps<{
  label: string
  title: string
  subtitle: string
}>()
</script>

<template>
  <section class="bg-dark pt-[72px] pb-24 px-10">
    <div class="max-w-[1200px] mx-auto pt-16">
      <SectionLabel :text="label" />
      <h1
        class="font-outfit font-extrabold text-white tracking-tight mb-5"
        style="font-size: clamp(48px, 6vw, 80px); letter-spacing: -0.03em;"
      >
        {{ title }}
      </h1>
      <p class="font-sans text-xl text-white/50 max-w-[560px]">
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>
