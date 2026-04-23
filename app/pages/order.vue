<script setup lang="ts">
useSeoMeta({ title: 'Buyurtma berish — humoprint' })

interface OrderForm {
  name: string
  phone: string
  product: string
  qty: string
  date: string
  note: string
  file: File | null
}

interface FormErrors {
  name?: string
  phone?: string
  product?: string
  qty?: string
}

const form = reactive<OrderForm>({
  name: '',
  phone: '',
  product: '',
  qty: '',
  date: '',
  note: '',
  file: null,
})

const errors = reactive<FormErrors>({})
const submitted = ref(false)

const productOptions = ['Vizitka', 'Katalog', 'Banner', 'Flayer', 'Stiker', 'Krujka / Souvenir', 'Qadoqlash', 'Boshqa']

const sidebarItems = [
  { icon: '📞', label: 'Telefon', val: '+998 99 123 45 67' },
  { icon: '💬', label: 'Telegram', val: '@humoprint_uz' },
  { icon: '🕐', label: 'Ish vaqti', val: 'Du–Ju: 9:00–18:00' },
]

const validate = (): boolean => {
  Object.assign(errors, { name: undefined, phone: undefined, product: undefined, qty: undefined })
  let valid = true
  if (!form.name.trim()) { errors.name = "Ismingizni kiriting"; valid = false }
  if (!form.phone.trim()) { errors.phone = "Telefon raqamingizni kiriting"; valid = false }
  if (!form.product) { errors.product = "Mahsulot turini tanlang"; valid = false }
  if (!form.qty) { errors.qty = "Miqdorni kiriting"; valid = false }
  return valid
}

const onSubmit = () => {
  if (validate()) submitted.value = true
}

const onFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  form.file = input.files?.[0] ?? null
}

const inputClass = (hasError?: string) =>
  `w-full font-sans text-[15px] text-dark bg-white rounded-[10px] outline-none transition-colors duration-200 border-[1.5px] ${
    hasError ? 'border-accent' : 'border-black/[0.12] focus:border-accent'
  }`

const inputStyle = 'padding: 14px 16px;'
</script>

<template>
  <div>
    <PageHero
      label="Buyurtma"
      title="Buyurtma berish"
      subtitle="Formani to'ldiring — biz 30 daqiqa ichida aloqaga chiqamiz."
    />

    <section class="bg-cream px-10 py-20">
      <div class="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">

        <!-- Form card -->
        <div class="bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.06)]" style="padding: 48px;">
          <!-- Success state -->
          <div v-if="submitted" class="text-center py-10">
            <div class="text-[56px] mb-5">✅</div>
            <h2 class="font-outfit font-extrabold text-[32px] text-dark mb-3" style="letter-spacing: -0.02em;">
              Buyurtma qabul qilindi!
            </h2>
            <p class="font-sans text-base text-muted leading-relaxed">
              Rahmat, {{ form.name }}! Biz siz bilan 30 daqiqa ichida bog'lanamiz.
            </p>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="onSubmit">
            <!-- Name + Phone -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label class="block font-sans font-semibold text-sm text-dark mb-1.5">
                  Ismingiz <span class="text-accent">*</span>
                </label>
                <input
                  v-model="form.name"
                  placeholder="Masalan: Aziz"
                  :class="inputClass(errors.name)"
                  :style="inputStyle"
                />
                <p v-if="errors.name" class="font-sans text-xs text-accent mt-1">{{ errors.name }}</p>
              </div>
              <div>
                <label class="block font-sans font-semibold text-sm text-dark mb-1.5">
                  Telefon raqamingiz <span class="text-accent">*</span>
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  :class="inputClass(errors.phone)"
                  :style="inputStyle"
                />
                <p v-if="errors.phone" class="font-sans text-xs text-accent mt-1">{{ errors.phone }}</p>
              </div>
            </div>

            <!-- Product + Qty -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label class="block font-sans font-semibold text-sm text-dark mb-1.5">
                  Mahsulot turi <span class="text-accent">*</span>
                </label>
                <select
                  v-model="form.product"
                  :class="inputClass(errors.product)"
                  :style="inputStyle"
                >
                  <option value="">Tanlang...</option>
                  <option v-for="opt in productOptions" :key="opt" :value="opt">{{ opt }}</option>
                </select>
                <p v-if="errors.product" class="font-sans text-xs text-accent mt-1">{{ errors.product }}</p>
              </div>
              <div>
                <label class="block font-sans font-semibold text-sm text-dark mb-1.5">
                  Miqdori <span class="text-accent">*</span>
                </label>
                <input
                  v-model="form.qty"
                  type="number"
                  min="1"
                  placeholder="100"
                  :class="inputClass(errors.qty)"
                  :style="inputStyle"
                />
                <p v-if="errors.qty" class="font-sans text-xs text-accent mt-1">{{ errors.qty }}</p>
              </div>
            </div>

            <!-- Date -->
            <div class="mb-5">
              <label class="block font-sans font-semibold text-sm text-dark mb-1.5">
                Kerakli sana <span class="font-normal text-muted">(ixtiyoriy)</span>
              </label>
              <input
                v-model="form.date"
                type="date"
                :class="inputClass()"
                :style="inputStyle"
              />
            </div>

            <!-- Note -->
            <div class="mb-5">
              <label class="block font-sans font-semibold text-sm text-dark mb-1.5">
                Qo'shimcha izoh <span class="font-normal text-muted">(ixtiyoriy)</span>
              </label>
              <textarea
                v-model="form.note"
                rows="4"
                placeholder="Dizayn haqida, o'lcham yoki boshqa tafsilotlar..."
                :class="inputClass()"
                :style="inputStyle + ' resize: vertical; line-height: 1.6;'"
              />
            </div>

            <!-- File upload -->
            <div class="mb-8">
              <label class="block font-sans font-semibold text-sm text-dark mb-1.5">
                Fayl yuklash <span class="font-normal text-muted">(ixtiyoriy)</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer border-[1.5px] border-dashed border-black/15 rounded-[10px] font-sans text-sm text-muted transition-all duration-200 hover:border-accent hover:bg-accent/[0.02]" style="padding: 14px 16px;">
                <input
                  type="file"
                  accept=".pdf,.ai,.jpg,.jpeg,.png"
                  class="hidden"
                  @change="onFileChange"
                />
                <span class="text-xl">📎</span>
                <span>{{ form.file ? form.file.name : 'Dizayn faylini yuklang (PDF, AI, JPG)' }}</span>
              </label>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="w-full bg-accent text-white rounded-xl font-sans font-bold text-base cursor-pointer border-none transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_10px_28px_rgba(232,93,38,0.4)]"
              style="padding: 18px;"
            >
              Buyurtmani yuborish →
            </button>

            <div class="flex items-center gap-2 justify-center mt-4">
              <span class="text-base">🔒</span>
              <p class="font-sans text-[13px] text-muted text-center">
                Ma'lumotlaringiz xavfsiz. Biz 30 daqiqa ichida javob beramiz.
              </p>
            </div>
          </form>
        </div>

        <!-- Sidebar -->
        <div class="flex flex-col gap-4">
          <div
            v-for="item in sidebarItems"
            :key="item.label"
            class="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center gap-4"
            style="padding: 24px;"
          >
            <div class="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-xl flex-shrink-0">
              {{ item.icon }}
            </div>
            <div>
              <div class="font-sans text-xs text-muted mb-1">{{ item.label }}</div>
              <div class="font-outfit font-bold text-base text-dark">{{ item.val }}</div>
            </div>
          </div>

          <div class="bg-dark rounded-2xl" style="padding: 24px;">
            <div class="font-outfit font-bold text-[17px] text-white mb-2">Tez javob kafolati</div>
            <p class="font-sans text-sm text-white/50 leading-relaxed">
              Buyurtmangizni qabul qilgandan so'ng 30 daqiqa ichida mutaxassisimiz siz bilan bog'lanadi.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
