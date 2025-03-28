<script setup lang="ts">
import NumberInput from './NumberInput.vue'
</script>

<template>
  <NumberInput :min="0" :max="100" :step="1" inputId="number-input"> Percentage </NumberInput>
</template>

<style scoped></style>
