<script setup lang="ts">
const props = defineProps<{
  modelValue: string   // YYYY-MM-DD
  placeholder?: string
  min?: string         // YYYY-MM-DD, defaults to today
}>()

const emit = defineEmits<{ 'update:modelValue': [v: string] }>()

const { locale } = useI18n()

// uz-UZ has poor/inconsistent Intl support across browsers — use static tables
const UZ_MONTHS = ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr']
const UZ_WEEKDAYS = ['Du','Se','Ch','Pa','Ju','Sh','Ya'] // Mon-first

// Map i18n locale codes → BCP 47 tags for Intl APIs (used for ru/en)
const LOCALE_MAP: Record<string, string> = { ru: 'ru-RU', en: 'en-US' }
const intlLocale = computed(() => LOCALE_MAP[locale.value] ?? 'en-US')

// "Today" label — Intl has no equivalent
const TODAY_LABEL: Record<string, string> = { uz: 'Bugun', ru: 'Сегодня', en: 'Today' }
const todayLabel = computed(() => TODAY_LABEL[locale.value] ?? 'Today')

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)

// ── calendar state ──────────────────────────────────────────────────────────
const today = new Date()
today.setHours(0, 0, 0, 0)

const minDate = computed(() => {
  if (props.min) { const d = new Date(props.min); d.setHours(0,0,0,0); return d }
  return today
})

const viewYear  = ref(today.getFullYear())
const viewMonth = ref(today.getMonth()) // 0-based

// ── derived values ──────────────────────────────────────────────────────────
const selectedDate = computed(() => props.modelValue ? new Date(props.modelValue + 'T00:00:00') : null)

const monthLabel = computed(() => {
  if (locale.value === 'uz')
    return `${UZ_MONTHS[viewMonth.value]} ${viewYear.value}`
  return new Date(viewYear.value, viewMonth.value, 1)
    .toLocaleDateString(intlLocale.value, { month: 'long', year: 'numeric' })
})

// Mon-first weekday headers
const weekDays = computed(() => {
  if (locale.value === 'uz') return UZ_WEEKDAYS
  // Use a known Monday (2024-01-01) for Intl
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2024, 0, 1 + i)
    return new Intl.DateTimeFormat(intlLocale.value, { weekday: 'short' }).format(d).slice(0, 2)
  })
})

interface Day {
  date: Date
  day: number
  inMonth: boolean
  isToday: boolean
  isSelected: boolean
  isPast: boolean
}

const calendarDays = computed((): Day[] => {
  const year = viewYear.value
  const month = viewMonth.value
  const first = new Date(year, month, 1)
  const last  = new Date(year, month + 1, 0)

  // Monday-first grid offset (0=Mon … 6=Sun)
  const startOffset = (first.getDay() + 6) % 7
  const endOffset   = (7 - ((last.getDay() + 6) % 7 + 1)) % 7

  const days: Day[] = []

  // padding days from prev month
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = new Date(year, month, -i)
    days.push(makeDay(d, false))
  }
  // current month
  for (let i = 1; i <= last.getDate(); i++) {
    days.push(makeDay(new Date(year, month, i), true))
  }
  // padding days from next month
  for (let i = 1; i <= endOffset; i++) {
    days.push(makeDay(new Date(year, month + 1, i), false))
  }
  return days
})

function makeDay(date: Date, inMonth: boolean): Day {
  date.setHours(0,0,0,0)
  const sel = selectedDate.value
  return {
    date,
    day: date.getDate(),
    inMonth,
    isToday: date.getTime() === today.getTime(),
    isSelected: !!sel && date.getTime() === sel.getTime(),
    isPast: date < minDate.value,
  }
}

// ── display label ───────────────────────────────────────────────────────────
const displayValue = computed(() => {
  if (!selectedDate.value) return ''
  if (locale.value === 'uz') {
    const d = selectedDate.value
    return `${d.getDate()} ${UZ_MONTHS[d.getMonth()]} ${d.getFullYear()}`
  }
  return selectedDate.value.toLocaleDateString(intlLocale.value, { day: 'numeric', month: 'long', year: 'numeric' })
})

// ── actions ──────────────────────────────────────────────────────────────────
const prevMonth = () => {
  if (viewMonth.value === 0) { viewMonth.value = 11; viewYear.value-- }
  else viewMonth.value--
}
const nextMonth = () => {
  if (viewMonth.value === 11) { viewMonth.value = 0; viewYear.value++ }
  else viewMonth.value++
}

const select = (d: Day) => {
  if (d.isPast) return
  const iso = `${d.date.getFullYear()}-${String(d.date.getMonth()+1).padStart(2,'0')}-${String(d.date.getDate()).padStart(2,'0')}`
  emit('update:modelValue', iso)
  open.value = false
}

const clear = (e: MouseEvent) => {
  e.stopPropagation()
  emit('update:modelValue', '')
}

const toggle = () => {
  if (!open.value) {
    // re-centre view on selected or today
    const ref = selectedDate.value ?? today
    viewYear.value  = ref.getFullYear()
    viewMonth.value = ref.getMonth()
  }
  open.value = !open.value
}

// ── close handlers ───────────────────────────────────────────────────────────
onMounted(() => {
  document.addEventListener('mousedown', onDocClick)
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.removeEventListener('mousedown', onDocClick)
  window.removeEventListener('keydown', onKey)
})
const onDocClick = (e: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) open.value = false
}
const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') open.value = false }
</script>

<template>
  <div ref="rootRef" style="position: relative;">

    <!-- Trigger -->
    <button
      type="button"
      @click="toggle"
      class="w-full font-sans text-[15px] bg-white rounded-[10px] outline-none cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 text-left"
      :style="`padding: 14px 16px; border: ${open ? '1.5px solid #E85D26' : '1.5px solid rgba(0,0,0,0.12)'}; box-shadow: ${open ? '0 0 0 4px rgba(232,93,38,0.08)' : 'none'};`"
    >
      <span class="flex items-center gap-2.5 flex-1">
        <!-- Calendar icon -->
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="flex-shrink-0" :style="{ color: displayValue ? '#E85D26' : '#999' }">
          <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.4"/>
          <path d="M1 7h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        <span :class="displayValue ? 'text-dark' : 'text-[#999]'">
          {{ displayValue || placeholder || 'Select date' }}
        </span>
      </span>
      <!-- Clear × -->
      <span
        v-if="modelValue"
        @click="clear"
        class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold leading-none transition-colors duration-150 cursor-pointer"
        style="background: rgba(0,0,0,0.08); color: #6B6B6B;"
        onmouseenter="this.style.background='#E85D26';this.style.color='#fff'"
        onmouseleave="this.style.background='rgba(0,0,0,0.08)';this.style.color='#6B6B6B'"
      >✕</span>
      <!-- Chevron -->
      <svg
        v-else
        width="12" height="8" viewBox="0 0 12 8" fill="none"
        class="flex-shrink-0 transition-transform duration-[250ms]"
        :style="open ? 'transform:rotate(180deg)' : ''"
      >
        <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B6B6B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Calendar panel -->
    <div
      class="absolute left-0 bg-white rounded-xl"
      style="top: calc(100% + 6px); z-index: 50; width: 300px; padding: 16px; box-shadow: 0 16px 40px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.06); transform-origin: top left; transition: opacity 0.2s ease, transform 0.2s ease;"
      :style="open
        ? 'opacity:1; transform:translateY(0) scale(1); pointer-events:auto;'
        : 'opacity:0; transform:translateY(-6px) scale(0.98); pointer-events:none;'"
    >
      <!-- Header: prev / month+year / next -->
      <div class="flex items-center justify-between mb-4">
        <button
          type="button"
          @click="prevMonth"
          class="w-8 h-8 flex items-center justify-center rounded-lg border-none cursor-pointer transition-colors duration-150"
          style="background: transparent; color: #6B6B6B;"
          onmouseenter="this.style.background='#F5F0EB';this.style.color='#E85D26'"
          onmouseleave="this.style.background='transparent';this.style.color='#6B6B6B'"
        >
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M6 1L1 6L6 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <span class="font-outfit font-bold text-[14px] text-dark capitalize">{{ monthLabel }}</span>

        <button
          type="button"
          @click="nextMonth"
          class="w-8 h-8 flex items-center justify-center rounded-lg border-none cursor-pointer transition-colors duration-150"
          style="background: transparent; color: #6B6B6B;"
          onmouseenter="this.style.background='#F5F0EB';this.style.color='#E85D26'"
          onmouseleave="this.style.background='transparent';this.style.color='#6B6B6B'"
        >
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="M1 1L6 6L1 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Week day headers -->
      <div class="grid grid-cols-7 mb-1">
        <span
          v-for="wd in weekDays"
          :key="wd"
          class="text-center font-mono text-[10px] tracking-[0.08em] uppercase pb-2"
          style="color: #999;"
        >{{ wd }}</span>
      </div>

      <!-- Day grid -->
      <div class="grid grid-cols-7 gap-y-1">
        <button
          v-for="(d, i) in calendarDays"
          :key="i"
          type="button"
          @click="select(d)"
          :disabled="d.isPast"
          class="flex items-center justify-center rounded-lg font-sans text-[13px] font-medium transition-all duration-150 border-none aspect-square"
          :class="d.isPast ? 'cursor-not-allowed' : 'cursor-pointer'"
          :style="[
            d.isSelected
              ? 'background:#E85D26; color:#fff; box-shadow:0 4px 12px rgba(232,93,38,0.35);'
              : d.isToday
                ? 'background:rgba(232,93,38,0.1); color:#E85D26; font-weight:700;'
                : !d.isPast && d.inMonth
                  ? 'color:#C84A10;'
                  : '',
            !d.inMonth  ? 'opacity:0.28;' : '',
            d.isPast && !d.isSelected ? 'color:#C0C0C0; opacity:0.6;' : '',
          ]"
          @mouseenter="(e) => { if (!d.isSelected && !d.isPast) (e.currentTarget as HTMLElement).style.background='#F5F0EB' }"
          @mouseleave="(e) => { if (!d.isSelected) (e.currentTarget as HTMLElement).style.background=d.isToday?'rgba(232,93,38,0.1)':'' }"
        >
          {{ d.day }}
        </button>
      </div>

      <!-- Today shortcut -->
      <div class="mt-3 pt-3" style="border-top: 1px solid rgba(0,0,0,0.06);">
        <button
          type="button"
          @click="select(calendarDays.find(d => d.isToday)!)"
          class="w-full font-sans text-[12px] font-semibold rounded-lg border-none cursor-pointer transition-colors duration-150"
          style="padding: 8px; color:#E85D26; background:rgba(232,93,38,0.06);"
          onmouseenter="this.style.background='rgba(232,93,38,0.12)'"
          onmouseleave="this.style.background='rgba(232,93,38,0.06)'"
        >{{ todayLabel }}</button>
      </div>
    </div>

  </div>
</template>
