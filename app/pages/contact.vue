<script setup lang="ts">
useSeoMeta({ title: 'Aloqa — humoprint' })

const form = reactive({ name: '', phone: '', message: '' })
const sent = ref(false)

const onSubmit = () => { sent.value = true }

const contactItems = [
  { icon: '📍', label: 'Manzil', val: "Toshkent sh., Yakkasaroy tumani, Chapanata ko'chasi, 7" },
  { icon: '📞', label: 'Telefon', val: '+998 99 123 45 67' },
  { icon: '✉️', label: 'Email', val: 'info@humoprint.uz' },
  { icon: '💬', label: 'Telegram', val: '@humoprint_uz' },
  { icon: '🕐', label: 'Ish vaqti', val: 'Dushanba–Juma: 9:00–18:00' },
]

const inputClass = 'w-full font-sans text-[15px] text-dark bg-white rounded-[10px] outline-none transition-colors duration-200 border-[1.5px] border-black/[0.12] focus:border-accent'
const inputStyle = 'padding: 14px 16px; display: block;'
</script>

<template>
  <div>
    <PageHero
      label="Aloqa"
      title="Biz bilan bog'laning"
      subtitle="Savollaringiz bormi? Biz yordam berishga tayyormiz."
    />

    <section class="bg-cream px-10 py-20">
      <div class="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        <!-- Contact info + map -->
        <div>
          <h2
            class="font-outfit font-extrabold text-[32px] text-dark mb-8"
            style="letter-spacing: -0.02em;"
          >
            Aloqa ma'lumotlari
          </h2>

          <div class="flex flex-col gap-4 mb-10">
            <div
              v-for="item in contactItems"
              :key="item.label"
              class="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] flex items-start gap-4"
              style="padding: 20px 24px;"
            >
              <div class="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-xl flex-shrink-0">
                {{ item.icon }}
              </div>
              <div>
                <div class="font-sans text-xs text-muted uppercase tracking-[0.05em] mb-1">{{ item.label }}</div>
                <div class="font-sans font-semibold text-[15px] text-dark leading-relaxed">{{ item.val }}</div>
              </div>
            </div>
          </div>

          <!-- Map placeholder -->
          <div
            class="rounded-2xl overflow-hidden relative border border-black/[0.08] flex items-center justify-center flex-col"
            style="height: 240px; background: #e8e4df;"
          >
            <div
              class="absolute inset-0"
              style="background-image: repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 12px); background-size: 17px 17px;"
            />
            <div class="relative flex flex-col items-center gap-2">
              <div
                class="w-9 h-9 bg-accent flex items-center justify-center"
                style="border-radius: 50% 50% 50% 0; transform: rotate(-45deg);"
              >
                <div
                  class="w-2.5 h-2.5 rounded-full bg-white"
                  style="transform: rotate(45deg);"
                />
              </div>
              <span class="font-mono text-[11px] text-muted tracking-[0.08em] uppercase mt-1">
                Yakkasaroy tumani, Toshkent
              </span>
            </div>
          </div>
        </div>

        <!-- Contact form -->
        <div class="bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.06)]" style="padding: 48px;">
          <h2
            class="font-outfit font-extrabold text-[28px] text-dark mb-8"
            style="letter-spacing: -0.02em;"
          >
            Xabar yuborish
          </h2>

          <!-- Success state -->
          <div v-if="sent" class="text-center py-10">
            <div class="text-[48px] mb-4">✉️</div>
            <h3 class="font-outfit font-extrabold text-2xl text-dark mb-2.5">Xabaringiz yuborildi!</h3>
            <p class="font-sans text-[15px] text-muted">Tez orada siz bilan bog'lanamiz.</p>
          </div>

          <!-- Form -->
          <form v-else class="flex flex-col gap-[18px]" @submit.prevent="onSubmit">
            <div>
              <label class="block font-sans font-semibold text-sm text-dark mb-1.5">Ismingiz</label>
              <input
                v-model="form.name"
                placeholder="To'liq ismingiz"
                required
                :class="inputClass"
                :style="inputStyle"
              />
            </div>
            <div>
              <label class="block font-sans font-semibold text-sm text-dark mb-1.5">Telefon</label>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="+998 90 123 45 67"
                required
                :class="inputClass"
                :style="inputStyle"
              />
            </div>
            <div>
              <label class="block font-sans font-semibold text-sm text-dark mb-1.5">Xabar</label>
              <textarea
                v-model="form.message"
                rows="5"
                placeholder="Savolingizni yozing..."
                required
                :class="inputClass"
                :style="inputStyle + ' resize: vertical; line-height: 1.6;'"
              />
            </div>
            <button
              type="submit"
              class="bg-accent text-white rounded-xl font-sans font-bold text-[15px] cursor-pointer border-none mt-1 transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_10px_28px_rgba(232,93,38,0.4)]"
              style="padding: 16px;"
            >
              Xabar yuborish →
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
