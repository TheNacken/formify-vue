<script setup lang="ts">
import { InputLabel } from "./index.ts";

defineProps({
  min: Number,
  max: Number,
  step: Number,
  inputId: String,
});
const model = defineModel();
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
      <span class="ml-2">min</span>
    </div>
  </div>
</template>
