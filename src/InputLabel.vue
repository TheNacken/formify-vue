<script setup lang="ts">
defineProps({
  inputId: String,
});
</script>

<template>
  <label
    :for="inputId"
    class="absolute -top-3 left-2 cursor-text bg-white px-1 text-sm text-nowrap text-gray-500"
  >
    <slot />
  </label>
</template>
