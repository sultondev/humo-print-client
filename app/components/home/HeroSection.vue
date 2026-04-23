<script setup lang="ts">
const loaded = ref(false)
onMounted(() => setTimeout(() => { loaded.value = true }, 80))

const stats = [
  { number: '500+', label: 'Mijoz' },
  { number: '10 yil', label: 'Tajriba' },
  { number: '1 kun', label: 'Tayyor' },
]
</script>

<template>
  <section
    class="min-h-screen bg-dark flex items-center relative overflow-hidden px-10"
    style="padding-top: 120px; padding-bottom: 80px;"
  >
    <!-- Orange glow -->
    <div
      class="absolute pointer-events-none"
      style="top: -20%; right: -10%; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(232,93,38,0.12) 0%, transparent 70%);"
    />

    <div class="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

      <!-- Left: Text -->
      <div
        class="transition-all duration-700 ease-out"
        :class="loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <SectionLabel text="Toshkent · O'zbekiston" />

        <h1
          class="font-outfit font-extrabold text-white mb-7"
          style="font-size: clamp(42px, 6vw, 80px); line-height: 1.05; letter-spacing: -0.03em;"
        >
          Har qanday g'oyani
          <span class="text-accent">bosma</span>
          shaklga aylantiramiz
        </h1>

        <p
          class="font-sans text-white/55 leading-relaxed mb-10 max-w-[480px]"
          style="font-size: clamp(16px, 1.5vw, 20px);"
        >
          Vizitka, banner, souvenir, qadoqlash va boshqa — yuqori sifat, tezkor yetkazib berish.
        </p>

        <div class="flex gap-3.5 flex-wrap mb-12">
          <NuxtLink
            to="/order"
            class="bg-accent text-white rounded-full font-sans font-bold text-base flex items-center gap-2 no-underline transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_12px_32px_rgba(232,93,38,0.4)]"
            style="padding: 16px 32px;"
          >
            Buyurtma berish <span class="text-lg">→</span>
          </NuxtLink>
          <NuxtLink
            to="/portfolio"
            class="bg-transparent text-white border border-white/25 rounded-full font-sans font-semibold text-base no-underline transition-all duration-200 hover:border-white/70"
            style="padding: 16px 32px;"
          >
            Ishlarimizni ko'rish
          </NuxtLink>
        </div>

        <!-- Trust stats -->
        <div class="flex gap-8 flex-wrap">
          <div v-for="stat in stats" :key="stat.label">
            <div class="font-outfit font-bold text-[22px] text-white">{{ stat.number }}</div>
            <div class="font-sans text-[13px] text-white/40">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Right: Hero image -->
      <div
        class="hidden lg:block transition-all ease-out"
        style="transition-duration: 900ms; transition-delay: 200ms;"
        :class="loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <div class="relative rounded-3xl overflow-hidden" style="aspect-ratio: 4/5;">
          <img
            src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80"
            alt="Printing products"
            class="w-full h-full object-cover block"
          />
          <div
            class="absolute inset-0"
            style="background: linear-gradient(160deg, transparent 60%, rgba(15,15,15,0.5));"
          />
          <!-- Floating badge -->
          <div
            class="absolute bottom-6 left-6 rounded-xl border border-white/10"
            style="background: rgba(15,15,15,0.85); backdrop-filter: blur(12px); padding: 12px 18px;"
          >
            <div class="font-mono text-[10px] text-accent tracking-[0.1em] mb-1">YANGI BUYURTMA</div>
            <div class="font-sans text-sm text-white font-semibold">Vizitka × 500 dona</div>
            <div class="font-sans text-xs text-white/40">Tayyor: 1 ish kuni</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
