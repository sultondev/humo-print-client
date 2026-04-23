<script setup lang="ts">
const { t, tm, rt } = useI18n()

useSeoMeta({ title: computed(() => `${t('order.page_title')} — humoprint`) })

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

const productOptions = computed(() => (tm('order.product_options') as string[]).map(o => rt(o)))

interface SidebarItem { label: string; val: string }
const SIDEBAR_ICONS = ['📞', '💬', '🕐']
const sidebarItems = computed(() => {
  return (tm('order.sidebar_items') as SidebarItem[]).map((item, i) => ({
    label: rt(item.label),
    val: rt(item.val),
    icon: SIDEBAR_ICONS[i],
  }))
})

const validate = (): boolean => {
  Object.assign(errors, { name: undefined, phone: undefined, product: undefined, qty: undefined })
  let valid = true
  if (!form.name.trim()) { errors.name = t('order.name_error'); valid = false }
  if (!form.phone.trim()) { errors.phone = t('order.phone_error'); valid = false }
  if (!form.product) { errors.product = t('order.product_error'); valid = false }
  if (!form.qty) { errors.qty = t('order.qty_error'); valid = false }
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
      :label="t('order.label')"
      :title="t('order.page_title')"
      :subtitle="t('order.page_subtitle')"
    />

    <section class="bg-cream px-10 py-20">
      <div class="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">

        <!-- Form card -->
        <div class="bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.06)]" style="padding: 48px;">
          <!-- Success state -->
          <div v-if="submitted" class="text-center py-10">
            <div class="text-[56px] mb-5">✅</div>
            <h2 class="font-outfit font-extrabold text-[32px] text-dark mb-3" style="letter-spacing: -0.02em;">
              {{ t('order.success_title') }}
            </h2>
            <p class="font-sans text-base text-muted leading-relaxed">
              {{ t('order.success_desc', { name: form.name }) }}
            </p>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="onSubmit">
            <!-- Name + Phone -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label class="block font-sans font-semibold text-sm text-dark mb-1.5">
                  {{ t('order.name_label') }} <span class="text-accent">*</span>
                </label>
                <input
                  v-model="form.name"
                  :placeholder="t('order.name_placeholder')"
                  :class="inputClass(errors.name)"
                  :style="inputStyle"
                />
                <p v-if="errors.name" class="font-sans text-xs text-accent mt-1">{{ errors.name }}</p>
              </div>
              <div>
                <label class="block font-sans font-semibold text-sm text-dark mb-1.5">
                  {{ t('order.phone_label') }} <span class="text-accent">*</span>
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  :placeholder="t('order.phone_placeholder')"
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
                  {{ t('order.product_label') }} <span class="text-accent">*</span>
                </label>
                <select
                  v-model="form.product"
                  :class="inputClass(errors.product)"
                  :style="inputStyle"
                >
                  <option value="">{{ t('order.product_placeholder') }}</option>
                  <option v-for="opt in productOptions" :key="opt" :value="opt">{{ opt }}</option>
                </select>
                <p v-if="errors.product" class="font-sans text-xs text-accent mt-1">{{ errors.product }}</p>
              </div>
              <div>
                <label class="block font-sans font-semibold text-sm text-dark mb-1.5">
                  {{ t('order.qty_label') }} <span class="text-accent">*</span>
                </label>
                <input
                  v-model="form.qty"
                  type="number"
                  min="1"
                  :placeholder="t('order.qty_placeholder')"
                  :class="inputClass(errors.qty)"
                  :style="inputStyle"
                />
                <p v-if="errors.qty" class="font-sans text-xs text-accent mt-1">{{ errors.qty }}</p>
              </div>
            </div>

            <!-- Date -->
            <div class="mb-5">
              <label class="block font-sans font-semibold text-sm text-dark mb-1.5">
                {{ t('order.date_label') }} <span class="font-normal text-muted">{{ t('order.optional') }}</span>
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
                {{ t('order.note_label') }} <span class="font-normal text-muted">{{ t('order.optional') }}</span>
              </label>
              <textarea
                v-model="form.note"
                rows="4"
                :placeholder="t('order.note_placeholder')"
                :class="inputClass()"
                :style="inputStyle + ' resize: vertical; line-height: 1.6;'"
              />
            </div>

            <!-- File upload -->
            <div class="mb-8">
              <label class="block font-sans font-semibold text-sm text-dark mb-1.5">
                {{ t('order.file_label') }} <span class="font-normal text-muted">{{ t('order.optional') }}</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer border-[1.5px] border-dashed border-black/15 rounded-[10px] font-sans text-sm text-muted transition-all duration-200 hover:border-accent hover:bg-accent/[0.02]" style="padding: 14px 16px;">
                <input
                  type="file"
                  accept=".pdf,.ai,.jpg,.jpeg,.png"
                  class="hidden"
                  @change="onFileChange"
                />
                <span class="text-xl">📎</span>
                <span>{{ form.file ? form.file.name : t('order.file_placeholder') }}</span>
              </label>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="w-full bg-accent text-white rounded-xl font-sans font-bold text-base cursor-pointer border-none transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_10px_28px_rgba(232,93,38,0.4)]"
              style="padding: 18px;"
            >
              {{ t('order.submit_btn') }}
            </button>

            <div class="flex items-center gap-2 justify-center mt-4">
              <span class="text-base">🔒</span>
              <p class="font-sans text-[13px] text-muted text-center">
                {{ t('order.privacy') }}
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
            <div class="font-outfit font-bold text-[17px] text-white mb-2">{{ t('order.guarantee_title') }}</div>
            <p class="font-sans text-sm text-white/50 leading-relaxed">
              {{ t('order.guarantee_desc') }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
