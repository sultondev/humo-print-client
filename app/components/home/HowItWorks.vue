<script setup lang="ts">
const steps = [
  { n: '01', title: "Buyurtma yuboring", desc: "Formani to'ldiring yoki bizga qo'ng'iroq qiling." },
  { n: '02', title: "Dizaynni tasdiqlang", desc: "Biz maket tayyorlaymiz, siz tasdiqlaysiz." },
  { n: '03', title: "Ishlab chiqarish", desc: "Zamonaviy uskunalarda sifatli bosma." },
  { n: '04', title: "Yetkazib berish", desc: "Tayyor mahsulotni o'z vaqtida olasiz." },
]
</script>

<template>
  <section class="bg-cream px-10 py-[120px]">
    <div class="max-w-[1200px] mx-auto">
      <FadeUp>
        <SectionLabel text="Jarayon" />
        <h2
          class="font-outfit font-extrabold text-dark mb-16"
          style="font-size: clamp(36px, 4vw, 56px); letter-spacing: -0.03em;"
        >
          Buyurtma berish juda oson
        </h2>
      </FadeUp>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        <FadeUp
          v-for="(step, i) in steps"
          :key="step.n"
          :delay="i * 100"
        >
          <div class="pr-8 pb-8 relative">
            <!-- Connector line (hidden on last item and mobile) -->
            <div
              v-if="i < steps.length - 1"
              class="absolute top-9 right-0 h-px border-t-2 border-dashed border-accent/30 hidden lg:block"
              style="left: 60%;"
            />
            <div
              class="font-outfit font-extrabold text-accent leading-none mb-4 opacity-90"
              style="font-size: 64px;"
            >
              {{ step.n }}
            </div>
            <h3 class="font-outfit font-bold text-xl text-dark mb-2.5">{{ step.title }}</h3>
            <p class="font-sans text-[15px] text-muted leading-relaxed">{{ step.desc }}</p>
          </div>
        </FadeUp>
      </div>
    </div>
  </section>
</template>
