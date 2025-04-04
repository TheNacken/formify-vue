<script setup lang="ts">
import { ArrowDropDownIcon } from './icons'
import { InputLabel } from './index'

interface Option {
  name: string
  value: string
}

const model = defineModel()

const props = defineProps<{
  options: Option[]
}>()
</script>

<template>
  <div class="relative m-2 mt-3 inline-block">
    <InputLabel>
      <slot />
    </InputLabel>
    <select
      class="block w-full rounded-md border-2 border-black/50 bg-white p-2 pr-10 focus-within:border-blue-900"
      style="-webkit-appearance: none; appearance: none; -moz-appearance: none"
      v-model="model"
    >
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.name }}
      </option>
    </select>

    <span class="pointer-events-none absolute inset-y-0 right-2 flex items-center">
      <ArrowDropDownIcon />
    </span>
  </div>
</template>
