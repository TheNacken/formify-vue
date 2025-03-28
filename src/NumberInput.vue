<script setup lang="ts">
import { InputLabel } from './index.ts'

defineProps({
  min: {
    type: Number,
    required: false,
  },
  max: {
    type: Number,
    required: false,
  },
  step: {
    type: Number,
    required: false,
  },
  inputId: {
    type: String,
    required: true,
  },
  suffix: {
    type: String,
    required: false,
  },
})
const model = defineModel()
</script>

<template>
  <div
    class="relative w-fit cursor-text rounded-md border-2 border-black/50 p-2 focus-within:border-blue-900"
  >
    <div class="flex items-center">
      <InputLabel :inputId="inputId">
        <slot />
      </InputLabel>
      <input
        class="w-[200px] p-2 outline-none"
        type="number"
        :min="min"
        :max="max"
        :step="step"
        :id="inputId"
        v-model="model"
      />
      <span class="ml-2" v-if="suffix">
        {{ suffix }}
      </span>
    </div>
  </div>
</template>
