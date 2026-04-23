<script setup lang="ts">
const { t, tm, rt } = useI18n()
const activeIdx = ref(0)

interface Quote { text: string; name: string; role: string }
const quotes = computed(() => {
  return (tm('testimonials.items') as Quote[]).map(q => ({
    text: rt(q.text),
    name: rt(q.name),
    role: rt(q.role),
  }))
})

let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    activeIdx.value = (activeIdx.value + 1) % quotes.value.length
  }, 5000)
})

onUnmounted(() => clearInterval(timer))
</script>

<template>
  <section class="bg-white px-10 py-[120px]">
    <div class="max-w-300 mx-auto">
      <FadeUp>
        <SectionLabel :text="t('testimonials.label')" />
        <h2
          class="font-outfit font-extrabold text-dark mb-16"
          style="font-size: clamp(36px, 4vw, 56px); letter-spacing: -0.03em;"
        >
          {{ t('testimonials.heading') }}
        </h2>
      </FadeUp>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FadeUp
          v-for="(quote, i) in quotes"
          :key="quote.name"
          :delay="i * 80"
        >
          <div
            class="bg-cream rounded-2xl p-9 border-[1.5px] transition-all duration-300"
            :class="activeIdx === i ? 'border-accent' : 'border-transparent'"
          >
            <div class="font-outfit text-[56px] text-accent leading-none mb-5 opacity-60">"</div>
            <p class="font-sans text-base text-dark leading-relaxed italic mb-6">{{ quote.text }}</p>
            <div class="font-outfit font-bold text-[15px] text-dark">{{ quote.name }}</div>
            <div class="font-sans text-[13px] text-muted mt-1">{{ quote.role }}</div>
          </div>
        </FadeUp>
      </div>
    </div>
  </section>
</template>
