<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="bg-dark px-10 py-[100px] relative overflow-hidden">
    <!-- Center glow -->
    <div
      class="absolute pointer-events-none"
      style="top: 50%; left: 50%; transform: translate(-50%, -50%); width: 600px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(232,93,38,0.1) 0%, transparent 70%);"
    />

    <div class="max-w-[800px] mx-auto text-center relative">
      <FadeUp>
        <h2
          class="font-outfit font-extrabold text-white mb-4"
          style="font-size: clamp(36px, 4vw, 56px); letter-spacing: -0.03em;"
        >
          {{ t('cta.heading') }}
        </h2>
        <p class="font-sans text-lg text-white/50 mb-10">
          {{ t('cta.desc') }}
        </p>
        <div class="flex gap-4 justify-center items-center flex-wrap">
          <NuxtLink
            :to="localePath('/order')"
            class="bg-accent text-white rounded-full font-sans font-bold text-[17px] no-underline transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_12px_32px_rgba(232,93,38,0.4)]"
            style="padding: 18px 40px;"
          >
            {{ t('cta.order_btn') }}
          </NuxtLink>
          <a
            :href="`tel:${t('cta.phone').replace(/\s/g, '')}`"
            class="font-outfit font-bold text-lg text-white no-underline flex items-center gap-2"
          >
            <span class="text-xl">📞</span> {{ t('cta.phone') }}
          </a>
        </div>
      </FadeUp>
    </div>
  </section>
</template>
