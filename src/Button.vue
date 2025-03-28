<script setup lang="ts">
const props = defineProps<{
  label: string;
}>();

const emit = defineEmits(["click"]);
</script>

<template>
  <input
    @click="emit('click')"
    type="submit"
    :value="props.label"
    class="cursor-pointer rounded-md border-2 border-black/50 p-2 focus-within:border-blue-900"
  />
</template>
