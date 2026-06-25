<script setup lang="ts">
export interface DropdownOption {
  value: string
  label: string
  icon?: string
  desc?: string
}

const props = defineProps<{
  modelValue: string
  options: DropdownOption[]
  placeholder?: string
  error?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const open = ref(false)
const hoveredIdx = ref(-1)
const rootRef = ref<HTMLElement | null>(null)

const selected = computed(() => props.options.find(o => o.value === props.modelValue))

const select = (value: string) => {
  emit('update:modelValue', value)
  open.value = false
}

const toggle = () => { open.value = !open.value }

// Close on outside click
onMounted(() => {
  document.addEventListener('mousedown', onDocClick)
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.removeEventListener('mousedown', onDocClick)
  window.removeEventListener('keydown', onKey)
})

const onDocClick = (e: MouseEvent) => {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    open.value = false
  }
}
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') open.value = false
}

const triggerBorder = computed(() => {
  if (props.error) return '1.5px solid #E85D26'
  if (open.value) return '1.5px solid #E85D26'
  return '1.5px solid rgba(0,0,0,0.12)'
})
</script>

<template>
  <div ref="rootRef" style="position: relative;">
    <!-- Trigger -->
    <button
      type="button"
      @click="toggle"
      class="w-full font-sans text-[15px] bg-white rounded-[10px] outline-none cursor-pointer transition-all duration-200"
      :style="`padding: 12px 16px; border: ${triggerBorder}; box-shadow: ${open ? '0 0 0 4px rgba(232,93,38,0.08)' : 'none'}; display: flex; align-items: center; justify-content: space-between; gap: 12px; text-align: left; line-height: 1.4;`"
    >
      <span class="flex items-center gap-2.5 flex-1 overflow-hidden" :class="selected ? 'text-dark font-medium' : 'text-[#999]'">
        <template v-if="selected">
          <span
            v-if="selected.icon"
            class="flex items-center justify-center text-[12px] flex-shrink-0 rounded-[6px]"
            style="width: 24px; height: 24px; background: rgba(232,93,38,0.1);"
          >{{ selected.icon }}</span>
          <span class="truncate">{{ selected.label }}</span>
        </template>
        <template v-else>{{ placeholder }}</template>
      </span>
      <!-- Chevron -->
      <svg
        width="12" height="8" viewBox="0 0 12 8" fill="none"
        class="flex-shrink-0 transition-transform duration-[250ms]"
        :style="open ? 'transform: rotate(180deg)' : 'transform: rotate(0)'"
      >
        <path d="M1 1.5L6 6.5L11 1.5" stroke="#6B6B6B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <!-- Panel -->
    <div
      class="absolute left-0 right-0 bg-white rounded-xl overflow-y-auto"
      style="top: calc(100% + 6px); padding: 6px; z-index: 50; max-height: 320px; box-shadow: 0 16px 40px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.06); transform-origin: top center; transition: opacity 0.2s ease, transform 0.2s ease;"
      :style="open
        ? 'opacity: 1; transform: translateY(0) scale(1); pointer-events: auto;'
        : 'opacity: 0; transform: translateY(-6px) scale(0.98); pointer-events: none;'"
    >
      <button
        v-for="(opt, i) in options"
        :key="opt.value"
        type="button"
        @mouseenter="hoveredIdx = i"
        @mouseleave="hoveredIdx = -1"
        @click="select(opt.value)"
        class="flex items-center gap-3 w-full rounded-lg border-none cursor-pointer font-sans text-[14px] text-left transition-colors duration-[120ms]"
        style="padding: 10px 12px;"
        :style="{
          background: opt.value === modelValue ? 'rgba(232,93,38,0.08)' : hoveredIdx === i ? '#F5F0EB' : 'transparent',
          color: opt.value === modelValue ? '#E85D26' : '#0F0F0F',
          fontWeight: opt.value === modelValue ? '600' : '500',
        }"
      >
        <span
          v-if="opt.icon"
          class="flex items-center justify-center text-base flex-shrink-0 rounded-lg transition-colors duration-150"
          style="width: 32px; height: 32px;"
          :style="{ background: opt.value === modelValue ? '#E85D26' : 'rgba(232,93,38,0.1)', color: opt.value === modelValue ? '#fff' : 'inherit' }"
        >{{ opt.icon }}</span>
        <span class="flex-1">
          <div>{{ opt.label }}</div>
          <div v-if="opt.desc" class="font-normal mt-0.5" style="font-size: 11px; color: #999;">{{ opt.desc }}</div>
        </span>
        <!-- Checkmark -->
        <svg v-if="opt.value === modelValue" width="14" height="14" viewBox="0 0 14 14" fill="none" class="flex-shrink-0">
          <path d="M2 7L5.5 10.5L12 4" stroke="#E85D26" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>
