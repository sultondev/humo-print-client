<script setup lang="ts">
const openIdx = ref<number | null>(null)

const toggle = (i: number) => {
  openIdx.value = openIdx.value === i ? null : i
}

const items = [
  {
    q: "Minimal buyurtma miqdori qancha?",
    a: "Raqamli bosmada minimal miqdor 1 dona, ofset bosmada esa 100 donadan boshlanadi.",
  },
  {
    q: "Buyurtma qancha vaqtda tayyor bo'ladi?",
    a: "Oddiy buyurtmalar 1–3 ish kunida, murakkab loyihalar 5–7 ish kunida tayyor bo'ladi.",
  },
  {
    q: "Dizayn xizmati ham bormi?",
    a: "Ha, professional dizaynerlarimiz maket tayyorlashdan to tayyor dizayngacha yordam beradi.",
  },
  {
    q: "Yetkazib berish bormi?",
    a: "Ha, Toshkent bo'ylab bepul yetkazib berish mavjud.",
  },
  {
    q: "To'lov qanday amalga oshiriladi?",
    a: "Naqd, karta va bank o'tkazmasi orqali to'lash mumkin.",
  },
]
</script>

<template>
  <section class="bg-cream px-10 py-[120px]">
    <div class="max-w-[760px] mx-auto">
      <FadeUp>
        <SectionLabel text="Savollar" />
        <h2
          class="font-outfit font-extrabold text-dark mb-12"
          style="font-size: clamp(36px, 4vw, 52px); letter-spacing: -0.03em;"
        >
          Ko'p beriladigan savollar
        </h2>
      </FadeUp>

      <FadeUp
        v-for="(item, i) in items"
        :key="i"
        :delay="i * 60"
      >
        <div
          class="border-b border-black/10 transition-all duration-300"
          :class="[
            i === 0 ? 'border-t border-t-black/10' : '',
            openIdx === i ? 'border-l-[3px] border-l-accent pl-4' : 'border-l-[3px] border-l-transparent pl-4',
          ]"
        >
          <button
            class="w-full bg-transparent border-none cursor-pointer py-6 flex justify-between items-center gap-4 text-left"
            @click="toggle(i)"
          >
            <span class="font-outfit font-semibold text-lg text-dark">{{ item.q }}</span>
            <span
              class="text-xl text-accent flex-shrink-0 transition-transform duration-300"
              :class="openIdx === i ? 'rotate-45' : 'rotate-0'"
            >+</span>
          </button>
          <div
            class="overflow-hidden transition-all duration-[350ms] ease-in-out"
            :style="{ maxHeight: openIdx === i ? '200px' : '0' }"
          >
            <p class="font-sans text-base text-muted leading-relaxed pb-6">{{ item.a }}</p>
          </div>
        </div>
      </FadeUp>
    </div>
  </section>
</template>
