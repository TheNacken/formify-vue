<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <input
    @click="emit('click')"
    type="submit"
    :value="props.label"
    class="cursor-pointer m-2 rounded-md border-2 border-black/50 px-3 py-2 focus-within:border-blue-900"
  />
</template>
