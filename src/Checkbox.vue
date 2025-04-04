<script setup lang="ts">
import { CheckIcon } from './icons'
import { computed } from 'vue'
import type { Size } from './model/size.ts'

const model = defineModel<boolean | string[]>({ default: false })

const props = defineProps<{
  name: string
  value: string
  inputId: string
  size: keyof Size
}>()

const sizes: Size = {
  sm: 'size-3',
  md: 'size-5',
  lg: 'size-7',
  xl: 'size-9',
}

const size = computed(() => {
  return sizes[props.size]
})

const onChange = (e: Event) => {
  const target: HTMLInputElement = e.target as HTMLInputElement
  const checked: boolean = target.checked

  if (Array.isArray(model.value)) {
    const value: string = props.value
    if (checked) {
      model.value = [...model.value, value]
    } else {
      model.value = model.value.filter((v) => v !== value)
    }
  } else {
    model.value = checked
  }
}
</script>

<template>
  <div class="flex items-center">
    <div class="relative mr-2 flex items-center" :class="size">
      <input
        :name="props.name"
        :value="props.value"
        :id="props.inputId"
        type="checkbox"
        :checked="Array.isArray(model) ? model.includes(props.value) : model"
        @change="onChange"
        class="cursor-pointer appearance-none rounded-md border-2 border-gray-500 checked:bg-black"
        :class="size"
      />
      <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
        <CheckIcon
          v-if="Array.isArray(model) ? model.includes(props.value) : model"
          :class="size"
          class="text-white"
        />
      </div>
    </div>
    <slot />
  </div>
</template>
