<script setup lang="ts">
import InputLabel from '@/InputLabel.vue'

defineProps({
  inputId: {
    type: String,
    required: true,
  },
})

const model = defineModel<string>({ default: '' })
</script>

<template>
  <div
    class="relative m-2 h-fit cursor-text rounded-md border-2 border-black/50 p-2 focus-within:border-blue-900"
    style="background-color: inherit"
  >
    <InputLabel :inputId="inputId">
      <slot />
    </InputLabel>
    <textarea v-model="model" :id="inputId" style="resize: none" class="outline-none"></textarea>
  </div>
</template>

<style scoped></style>
