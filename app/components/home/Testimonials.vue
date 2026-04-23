<script setup lang="ts">
const activeIdx = ref(0)

const quotes = [
  {
    text: "PrintCraft bilan ishlash juda qulay. Vizitkalamiz 2 kunda tayyor bo'ldi, sifati a'lo darajada.",
    name: 'Aziz Karimov',
    role: 'GreenTech direktori',
  },
  {
    text: "Katalogimizni ofset usulda chop etishdi — rang va sifat kutganimizdek chiqdi.",
    name: 'Nilufar Rashidova',
    role: 'MedPlus marketing menejeri',
  },
  {
    text: "Har safar o'z vaqtida, sifatli va professional xizmat. Tavsiya qilaman!",
    name: 'Jasur Toshmatov',
    role: 'FastBuild asoschisi',
  },
]

let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    activeIdx.value = (activeIdx.value + 1) % quotes.length
  }, 5000)
})

onUnmounted(() => clearInterval(timer))
</script>

<template>
  <section class="bg-white px-10 py-[120px]">
    <div class="max-w-[1200px] mx-auto">
      <FadeUp>
        <SectionLabel text="Mijozlar fikri" />
        <h2
          class="font-outfit font-extrabold text-dark mb-16"
          style="font-size: clamp(36px, 4vw, 56px); letter-spacing: -0.03em;"
        >
          Bizga ishonishadi
        </h2>
      </FadeUp>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FadeUp
          v-for="(quote, i) in quotes"
          :key="i"
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
