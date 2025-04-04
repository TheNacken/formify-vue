<script setup lang="ts">
import { InputLabel } from './index'
import { ref } from 'vue'

defineProps({
  inputId: {
    type: String,
    required: true,
  },
})

const model = defineModel<string>({ default: '' })
const inputRef = ref<HTMLTextAreaElement | null>(null)
</script>

<template>
  <div
    class="relative m-2 cursor-text rounded-md border-2 border-black/50 p-2 focus-within:border-blue-900"
    style="background-color: inherit"
    @click="inputRef?.focus()"
  >
    <InputLabel :inputId="inputId">
      <slot />
    </InputLabel>
    <textarea
      v-model="model"
      :id="inputId"
      style="resize: none"
      class="w-full outline-none"
      ref="inputRef"
    />
  </div>
</template>

<style scoped></style>
