<script setup lang="ts">
import { InputLabel } from './index.ts'
import { CancelIcon } from './icons'
import { ref, computed, watch, type Ref, ModelRef } from 'vue'

const model: ModelRef<string[]> = defineModel<string[]>({ default: [] })

const props = defineProps({
  inputId: String,
  autocompleteOptions: {
    type: Array as () => string[],
    default: () => [],
  },
  allowCustom: {
    type: Boolean,
    default: true,
  },
  preventDuplicates: {
    type: Boolean,
    default: true,
  },
})
const inputRef: Ref<HTMLInputElement | null> = ref(null)
const inputValue = ref('')
const isInputFocused = ref(false)
const activeIndex = ref(-1)

const filteredOptions = computed(() =>
  props.autocompleteOptions.filter(
    (option: string) =>
      option.toLowerCase().includes(inputValue.value.toLowerCase()) &&
      !model.value.includes(option),
  ),
)

watch([inputValue, isInputFocused, filteredOptions], () => {
  activeIndex.value = -1
})

const addItem = (item: string) => {
  const trimmedItem = item.trim()
  if (!trimmedItem) return

  if (!props.allowCustom && !props.autocompleteOptions.includes(trimmedItem)) {
    return
  }

  if (props.preventDuplicates && model.value.includes(trimmedItem)) return

  model.value = [...model.value, trimmedItem]
  inputValue.value = ''
  activeIndex.value = -1
}

const removeItem = (item: string) => {
  model.value = model.value.filter((i) => i !== item)
}

const onKeyDown = (event: KeyboardEvent) => {
  if (!filteredOptions.value.length) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      activeIndex.value = (activeIndex.value + 1) % filteredOptions.value.length
      break
    case 'ArrowUp':
      event.preventDefault()
      activeIndex.value =
        (activeIndex.value - 1 + filteredOptions.value.length) % filteredOptions.value.length
      break
    case 'Enter':
      event.preventDefault()
      if (activeIndex.value >= 0 && activeIndex.value < filteredOptions.value.length) {
        addItem(filteredOptions.value[activeIndex.value])
      } else {
        addItem(inputValue.value)
      }
      break
    default:
      activeIndex.value = -1
  }
}

const onOptionMouseDown = (item: string, event: MouseEvent) => {
  event.preventDefault()
  addItem(item)
}
</script>

<template>
  <div
    class="relative m-2 mt-3 cursor-text rounded-md border-2 border-black/50 p-2 focus-within:border-blue-900"
    @click="inputRef?.focus()"
  >
    <div class="flex flex-wrap items-center">
      <InputLabel :inputId="inputId">
        <slot />
      </InputLabel>
      <span
        v-for="item in model"
        :key="item"
        class="m-1 flex w-fit items-center rounded-xl bg-gray-300 p-2 text-sm"
      >
        {{ item }}
        <span
          @mousedown.prevent="removeItem(item)"
          class="ml-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-gray-500"
        >
          <CancelIcon />
        </span>
      </span>
      <input
        ref="inputRef"
        v-model="inputValue"
        class="p-2 outline-none"
        type="text"
        :id="inputId"
        @focus="isInputFocused = true"
        @blur="isInputFocused = false"
        @keydown="onKeyDown"
        @keydown.enter.tab.prevent="addItem(inputValue)"
      />
    </div>
    <ul
      v-if="isInputFocused && filteredOptions.length"
      class="absolute left-0 z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg"
    >
      <li
        v-for="(option, index) in filteredOptions"
        :key="option"
        @mousedown="onOptionMouseDown(option, $event)"
        :class="['cursor-pointer p-2 hover:bg-gray-100', { 'bg-gray-200': index === activeIndex }]"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>
