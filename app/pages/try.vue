<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({ title: computed(() => `${t('try.page_title')} — humoprint`) })

const DTF_MAX_WIDTH_CM = 28

interface ProductConfig {
  id: string
  labelKey: string
  icon: string
  img: string
  zone: { top: number; left: number; width: number; height: number }
  zoneRealCm: number
  bg: string
  defaultSizeCm: number
}

const PRODUCTS: ProductConfig[] = [
  {
    id: 'tshirt',
    labelKey: 'try.product_tshirt',
    icon: '👕',
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=85',
    zone: { top: 32, left: 50, width: 26, height: 28 },
    zoneRealCm: 30,
    bg: '#E8E5E0',
    defaultSizeCm: 18,
  },
  {
    id: 'cap',
    labelKey: 'try.product_cap',
    icon: '🧢',
    img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=85',
    zone: { top: 38, left: 50, width: 22, height: 16 },
    zoneRealCm: 12,
    bg: '#2C2C30',
    defaultSizeCm: 8,
  },
  {
    id: 'mug',
    labelKey: 'try.product_mug',
    icon: '☕',
    img: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900&q=85',
    zone: { top: 45, left: 50, width: 22, height: 22 },
    zoneRealCm: 22,
    bg: '#F2EFEA',
    defaultSizeCm: 12,
  },
  {
    id: 'book',
    labelKey: 'try.product_book',
    icon: '📕',
    img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=900&q=85',
    zone: { top: 40, left: 50, width: 30, height: 22 },
    zoneRealCm: 21,
    bg: '#D9D2C5',
    defaultSizeCm: 14,
  },
]

const LS_KEY = 'humoprint_logo_v1'

const activeProductId = ref('tshirt')
const logoDataUrl = ref<string | null>(null)
const logoSizeCm = ref(18)
const logoOffsetX = ref(0)
const logoOffsetY = ref(0)
const logoRotation = ref(0)
const dragOver = ref(false)
const isDragging = ref(false)
const fileError = ref('')
const stageRef = ref<HTMLElement | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

const product = computed(() => PRODUCTS.find(p => p.id === activeProductId.value) ?? PRODUCTS[0])
const logoWidthPct = computed(() => (logoSizeCm.value / product.value.zoneRealCm) * product.value.zone.width)

onMounted(() => {
  try {
    const saved = localStorage.getItem(LS_KEY)
    if (saved) logoDataUrl.value = saved
  } catch (e) {}
})

watch(activeProductId, () => {
  logoOffsetX.value = 0
  logoOffsetY.value = 0
  logoRotation.value = 0
  logoSizeCm.value = Math.min(product.value.defaultSizeCm, DTF_MAX_WIDTH_CM)
})

watch(logoSizeCm, (val) => {
  if (val > DTF_MAX_WIDTH_CM) logoSizeCm.value = DTF_MAX_WIDTH_CM
})

const handleFile = (file: File | undefined) => {
  if (!file) return
  fileError.value = ''
  if (!file.type.startsWith('image/')) {
    fileError.value = t('try.file_error')
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    const dataUrl = e.target?.result as string
    logoDataUrl.value = dataUrl
    try { localStorage.setItem(LS_KEY, dataUrl) } catch (_) {}
  }
  reader.readAsDataURL(file)
}

const handleInputChange = (e: Event) => {
  handleFile((e.target as HTMLInputElement).files?.[0])
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  dragOver.value = false
  handleFile(e.dataTransfer?.files?.[0])
}

const clearLogo = () => {
  logoDataUrl.value = null
  try { localStorage.removeItem(LS_KEY) } catch (_) {}
  if (fileInputRef.value) fileInputRef.value.value = ''
}

const resetSettings = () => {
  logoSizeCm.value = product.value.defaultSizeCm
  logoOffsetX.value = 0
  logoOffsetY.value = 0
  logoRotation.value = 0
}

// Drag-to-reposition logo on stage
const dragState = { startX: 0, startY: 0, baseX: 0, baseY: 0 }

const onLogoPointerDown = (e: MouseEvent | TouchEvent) => {
  if (!logoDataUrl.value) return
  e.preventDefault()
  isDragging.value = true
  const point = (e as TouchEvent).touches ? (e as TouchEvent).touches[0] : (e as MouseEvent)
  dragState.startX = point.clientX
  dragState.startY = point.clientY
  dragState.baseX = logoOffsetX.value
  dragState.baseY = logoOffsetY.value

  const onMove = (ev: MouseEvent | TouchEvent) => {
    const p = (ev as TouchEvent).touches ? (ev as TouchEvent).touches[0] : (ev as MouseEvent)
    const stage = stageRef.value
    if (!stage) return
    const limX = stage.clientWidth * 0.45
    const limY = stage.clientHeight * 0.45
    logoOffsetX.value = Math.max(-limX, Math.min(limX, dragState.baseX + p.clientX - dragState.startX))
    logoOffsetY.value = Math.max(-limY, Math.min(limY, dragState.baseY + p.clientY - dragState.startY))
  }

  const onUp = () => {
    isDragging.value = false
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onUp)
    window.removeEventListener('touchmove', onMove)
    window.removeEventListener('touchend', onUp)
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onUp)
  window.addEventListener('touchmove', onMove, { passive: false })
  window.addEventListener('touchend', onUp)
}
</script>

<template>
  <div>
    <PageHero
      :label="t('try.label')"
      :title="t('try.page_title')"
      :subtitle="t('try.page_subtitle')"
    />

    <section class="bg-cream px-10" style="padding-top: 60px; padding-bottom: 100px;">
      <div class="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">

        <!-- Left: Preview Stage -->
        <div>
          <!-- Product tabs -->
          <div class="flex gap-2 mb-5 flex-wrap">
            <button
              v-for="p in PRODUCTS"
              :key="p.id"
              class="flex items-center gap-2 rounded-full font-sans font-semibold text-sm border-none cursor-pointer transition-all duration-200"
              style="padding: 12px 22px;"
              :style="{
                background: activeProductId === p.id ? '#0F0F0F' : '#fff',
                color: activeProductId === p.id ? '#fff' : '#0F0F0F',
                boxShadow: activeProductId === p.id ? 'none' : '0 2px 8px rgba(0,0,0,0.06)',
              }"
              @click="activeProductId = p.id"
            >
              <span class="text-base">{{ p.icon }}</span>
              {{ t(p.labelKey) }}
            </button>
          </div>

          <!-- Stage -->
          <div
            ref="stageRef"
            class="relative rounded-2xl overflow-hidden select-none"
            style="aspect-ratio: 4/3; box-shadow: 0 8px 32px rgba(0,0,0,0.08);"
            :style="{ background: product.bg }"
          >
            <img
              :src="product.img"
              :alt="t(product.labelKey)"
              class="w-full h-full object-cover block pointer-events-none"
              draggable="false"
            />

            <!-- Draggable logo overlay -->
            <div
              v-if="logoDataUrl"
              class="absolute flex items-center justify-center"
              style="touch-action: none; border-radius: 2px; height: auto;"
              :style="{
                top: `calc(${product.zone.top}% + ${logoOffsetY}px)`,
                left: `calc(${product.zone.left}% + ${logoOffsetX}px)`,
                transform: `translate(-50%, -50%) rotate(${logoRotation}deg)`,
                width: `${logoWidthPct}%`,
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: isDragging ? 'none' : 'width 0.15s ease',
                outline: isDragging ? '2px dashed rgba(232,93,38,0.7)' : 'none',
                outlineOffset: '4px',
              }"
              @mousedown="onLogoPointerDown"
              @touchstart.prevent="onLogoPointerDown"
            >
              <img
                :src="logoDataUrl"
                alt="Logo"
                draggable="false"
                class="w-full pointer-events-none"
                style="height: auto; object-fit: contain;"
                :style="{
                  filter: product.id === 'cap'
                    ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                    : 'drop-shadow(0 1px 1px rgba(0,0,0,0.15))',
                  mixBlendMode: (product.id === 'tshirt' || product.id === 'cap') ? 'normal' : 'multiply',
                }"
              />
            </div>

            <!-- Empty state: logo zone placeholder -->
            <div
              v-else
              class="absolute flex items-center justify-center"
              style="border: 2px dashed rgba(232,93,38,0.7); border-radius: 8px; background: rgba(232,93,38,0.08); backdrop-filter: blur(4px);"
              :style="{
                top: `${product.zone.top}%`,
                left: `${product.zone.left}%`,
                transform: 'translate(-50%, -50%)',
                width: `${product.zone.width}%`,
                height: `${product.zone.height}%`,
              }"
            >
              <span
                class="font-mono text-[11px] text-accent tracking-[0.1em] uppercase text-center"
                style="padding: 0 8px;"
              >
                {{ t('try.logo_zone') }}
              </span>
            </div>

            <!-- Drag hint pill -->
            <div
              v-if="logoDataUrl && !isDragging"
              class="absolute pointer-events-none flex items-center gap-1.5 rounded-full font-sans text-[11px]"
              style="top: 16px; left: 16px; background: rgba(15,15,15,0.75); backdrop-filter: blur(8px); padding: 6px 12px; color: rgba(255,255,255,0.85);"
            >
              <span>✥</span> {{ t('try.drag_hint') }}
            </div>

            <!-- Watermark -->
            <div
              class="absolute pointer-events-none font-mono text-[10px]"
              style="bottom: 16px; right: 16px; background: rgba(15,15,15,0.7); backdrop-filter: blur(8px); padding: 6px 10px; border-radius: 6px; color: rgba(255,255,255,0.7); letter-spacing: 0.08em;"
            >
              humo<span class="text-accent">print</span> mockup
            </div>
          </div>

          <!-- Size indicator bar -->
          <div
            class="mt-3.5 flex items-center justify-between gap-3 flex-wrap bg-white rounded-[10px]"
            style="padding: 10px 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.05);"
          >
            <span class="font-sans text-[13px] text-muted">
              💡 {{ t('try.size_info_prefix') }}
              <strong class="text-dark">{{ product.zoneRealCm }}{{ t('try.size_info_unit') }}</strong>
              {{ t('try.size_info_suffix') }}
            </span>
            <span
              v-if="logoDataUrl"
              class="font-mono text-[11px] text-accent bg-accent/10 rounded-full"
              style="padding: 4px 10px; letter-spacing: 0.05em;"
            >
              Logo: {{ logoSizeCm.toFixed(1) }}{{ t('try.size_info_unit') }} · {{ Math.round(logoRotation) }}°
            </span>
          </div>
        </div>

        <!-- Right: Controls Panel -->
        <div class="flex flex-col gap-4" style="position: sticky; top: 88px;">

          <!-- Upload zone -->
          <div
            class="rounded-2xl cursor-pointer transition-all duration-200 text-center"
            style="padding: 24px;"
            :style="{
              background: dragOver ? 'rgba(232,93,38,0.04)' : '#fff',
              border: dragOver ? '2px dashed #E85D26' : '2px dashed rgba(0,0,0,0.12)',
            }"
            @dragover.prevent="dragOver = true"
            @dragleave="dragOver = false"
            @drop="handleDrop"
            @click="fileInputRef?.click()"
          >
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleInputChange"
            />

            <!-- Logo preview -->
            <div v-if="logoDataUrl">
              <div
                class="mx-auto mb-3 bg-cream rounded-xl overflow-hidden flex items-center justify-center"
                style="width: 80px; height: 80px; padding: 8px;"
              >
                <img :src="logoDataUrl" alt="Your logo" class="max-w-full max-h-full object-contain" />
              </div>
              <p class="font-sans font-semibold text-sm text-dark mb-1">{{ t('try.logo_uploaded') }}</p>
              <p class="font-sans text-xs text-muted">{{ t('try.logo_change') }}</p>
            </div>

            <!-- Empty upload prompt -->
            <div v-else>
              <div class="text-[36px] mb-2.5">📎</div>
              <p class="font-outfit font-semibold text-[15px] text-dark mb-1.5">{{ t('try.upload_title') }}</p>
              <p class="font-sans text-[13px] text-muted leading-relaxed">
                {{ t('try.upload_desc') }}<br />
                <span class="text-[11px] text-muted/70">{{ t('try.upload_hint') }}</span>
              </p>
            </div>
          </div>

          <p v-if="fileError" class="font-sans text-xs text-accent text-center -mt-2">{{ fileError }}</p>

          <!-- Adjustment controls (only when logo is uploaded) -->
          <div
            v-if="logoDataUrl"
            class="bg-white rounded-2xl"
            style="padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.05);"
          >
            <p class="font-outfit font-bold text-[13px] tracking-[0.08em] text-muted uppercase mb-[18px]">
              {{ t('try.settings_title') }}
            </p>

            <!-- Size slider -->
            <div class="mb-[18px]">
              <div class="flex justify-between items-baseline mb-1.5">
                <label class="font-sans text-[13px] font-medium text-dark">{{ t('try.size_label') }}</label>
                <span class="font-mono text-[12px] text-accent">{{ logoSizeCm.toFixed(1) }}{{ t('try.size_info_unit') }}</span>
              </div>
              <input
                v-model.number="logoSizeCm"
                type="range"
                :min="3"
                :max="Math.min(Math.round(product.zoneRealCm * 1.2), DTF_MAX_WIDTH_CM)"
                :step="0.5"
                class="w-full cursor-pointer"
                style="accent-color: #E85D26;"
              />
            </div>

            <!-- DTF info note -->
            <div
              class="flex items-center gap-2 rounded-lg"
              style="background: rgba(0,0,0,0.04); padding: 8px 12px; margin-top: -10px; margin-bottom: 14px;"
            >
              <span class="text-[13px]">ℹ️</span>
              <span class="font-sans text-[11px] text-muted leading-relaxed">
                {{ t('try.dtf_info_prefix') }} <strong class="text-dark">{{ DTF_MAX_WIDTH_CM }} {{ t('try.size_info_unit') }}</strong>, {{ t('try.dtf_info_suffix') }}
              </span>
            </div>

            <!-- Rotation slider -->
            <div class="mb-[18px]">
              <div class="flex justify-between items-baseline mb-1.5">
                <label class="font-sans text-[13px] font-medium text-dark">{{ t('try.rotation_label') }}</label>
                <span class="font-mono text-[12px] text-accent">{{ Math.round(logoRotation) }}°</span>
              </div>
              <input
                v-model.number="logoRotation"
                type="range"
                min="-180"
                max="180"
                step="1"
                class="w-full cursor-pointer"
                style="accent-color: #E85D26;"
              />
            </div>

            <!-- Quick rotation buttons -->
            <div class="flex gap-1.5 mb-3.5" style="margin-top: -8px;">
              <button
                v-for="deg in [0, 90, -90, 180]"
                :key="deg"
                class="flex-1 rounded-md font-mono text-[11px] border-none cursor-pointer transition-all duration-150"
                style="padding: 6px 8px;"
                :style="{
                  background: Math.round(logoRotation) === deg ? '#0F0F0F' : '#F5F0EB',
                  color: Math.round(logoRotation) === deg ? '#fff' : '#6B6B6B',
                }"
                @click="logoRotation = deg"
              >{{ deg }}°</button>
            </div>

            <!-- Drag info hint -->
            <div
              class="flex items-center gap-2 rounded-lg mb-3.5"
              style="background: rgba(232,93,38,0.08); padding: 10px 12px;"
            >
              <span class="text-sm">✥</span>
              <span class="font-sans text-[12px] text-dark leading-relaxed">{{ t('try.drag_position_info') }}</span>
            </div>

            <!-- Reset button -->
            <button
              class="w-full bg-transparent font-sans text-[13px] text-muted cursor-pointer transition-all duration-200 rounded-lg hover:text-accent"
              style="border: 1px solid rgba(0,0,0,0.12); padding: 8px 14px;"
              @click="resetSettings"
              @mouseenter="($event.target as HTMLElement).style.borderColor = '#E85D26'"
              @mouseleave="($event.target as HTMLElement).style.borderColor = 'rgba(0,0,0,0.12)'"
            >
              {{ t('try.reset_btn') }}
            </button>
          </div>

          <!-- Action card -->
          <div class="bg-dark rounded-2xl text-white" style="padding: 24px;">
            <div class="font-outfit font-bold text-[17px] mb-2">{{ t('try.action_title') }}</div>
            <p class="font-sans text-sm leading-relaxed mb-4" style="color: rgba(255,255,255,0.55);">
              {{ t('try.action_desc') }}
            </p>
            <NuxtLink
              :to="localePath('/order')"
              class="block w-full bg-accent text-white text-center rounded-full font-sans font-bold text-sm no-underline transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_22px_rgba(232,93,38,0.4)]"
              style="padding: 12px 22px;"
            >
              {{ t('common.order_arrow') }}
            </NuxtLink>
          </div>

          <!-- Clear logo -->
          <button
            v-if="logoDataUrl"
            class="bg-transparent border-none cursor-pointer font-sans text-[13px] text-muted underline text-center"
            style="padding: 4px;"
            @click="clearLogo"
          >
            {{ t('try.clear_logo') }}
          </button>

        </div>
      </div>
    </section>
  </div>
</template>