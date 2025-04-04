<script setup lang="ts">
import { ref, onUnmounted, watch, computed } from 'vue'

const model = defineModel<number>({ default: 0 })
const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  markers: { type: Array as () => number[], default: () => [] },
})

const sliderRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const isHovering = ref(false)

// Value validation and stepping
watch(
  model,
  (newVal) => {
    const clamped = Math.min(props.max, Math.max(props.min, newVal))
    const stepped = Math.round(clamped / props.step) * props.step
    if (stepped !== newVal) model.value = stepped
  },
  { immediate: true },
)

const calculateValue = (event: MouseEvent) => {
  if (!sliderRef.value) return model.value
  const rect = sliderRef.value.getBoundingClientRect()
  const rawValue = ((event.clientX - rect.left) / rect.width) * (props.max - props.min) + props.min
  return Math.round(Math.min(props.max, Math.max(props.min, rawValue)) / props.step) * props.step
}

// Event handlers
const handleMouseMove = (event: MouseEvent) => {
  model.value = calculateValue(event)
}

const handleMouseUp = () => {
  isDragging.value = false
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
}

const handleMouseDown = (event: MouseEvent) => {
  isDragging.value = true
  model.value = calculateValue(event)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
}

onUnmounted(handleMouseUp)

// Position calculations
const percentage = computed(() => ((model.value - props.min) / (props.max - props.min)) * 100)

const markerPositions = computed(() =>
  props.markers.map((marker) => ((marker - props.min) / (props.max - props.min)) * 100),
)
</script>

<template>
  <div
    ref="sliderRef"
    class="relative m-2 mx-5 mb-8 h-1 cursor-pointer rounded-2xl bg-gray-500 text-gray-500"
    @mousedown="handleMouseDown"
  >
    <!-- Progress bar -->
    <div class="h-1 rounded-2xl bg-green-500" :style="{ width: `${percentage}%` }" />

    <!-- Label slot -->
    <div class="absolute -top-9 left-0 select-none">
      <slot></slot>
    </div>

    <div
      v-for="(position, index) in markerPositions"
      :key="index"
      class="absolute top-[calc(100%+0.25rem)] left-0 -translate-x-1/2"
      :style="{ left: `${position}%` }"
    >
      <div class="h-3 w-px bg-gray-400" />
      <span class="absolute top-full left-1/2 -translate-x-1/2 text-xs text-gray-500">
        {{ props.markers[index] }}
      </span>
    </div>

    <div
      class="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full bg-green-500 shadow-lg"
      :style="{ left: `${percentage}%` }"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <div
        v-if="isDragging || isHovering"
        class="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-2 rounded-md bg-gray-800 px-2 py-1 text-sm text-white shadow-lg transition-opacity duration-200 select-none"
      >
        {{ model }}
        <div
          class="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-800"
        />
      </div>
    </div>
  </div>
</template>
