<script setup lang="ts">
import InputLabel from './InputLabel.vue'

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
  prefix: {
    type: String,
    required: false,
  },
  suffix: {
    type: String,
    required: false,
  },
})

const model = defineModel<number>({ default: 0 })
</script>

<template>
  <div
    class="relative m-2 h-fit w-[200px] cursor-text rounded-md border-2 border-black/50 p-2 focus-within:border-blue-900"
    style="background-color: inherit"
  >
    <InputLabel :inputId="inputId">
      <slot />
    </InputLabel>
    <div class="flex items-center justify-between">
      <span class="mr-2" v-if="prefix">
        {{ prefix }}
      </span>
      <input
        class="w-full bg-[var(--bg-color)] p-1 outline-none"
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
