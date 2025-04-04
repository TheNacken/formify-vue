<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps({
  inputId: String,
})

const backgroundColor = ref('white')

onMounted(() => {
  let element = document.getElementById(props.inputId)?.parentElement

  while (element) {
    const bgColor = getComputedStyle(element).backgroundColor
    if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
      backgroundColor.value = bgColor
      break
    }
    element = element.parentElement
  }
})
</script>

<template>
  <label
    :for="inputId"
    :style="{ backgroundColor }"
    class="absolute -top-3 left-2 cursor-text px-1 text-sm text-nowrap text-gray-500"
  >
    <slot />
  </label>
</template>
