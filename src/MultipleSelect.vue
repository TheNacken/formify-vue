<script setup lang="ts">
import { InputLabel } from './index.ts'
import { CancelIcon } from './icons'
import { type ModelRef, type Ref, ref } from 'vue'

defineProps({
  inputId: String,
})
const model: ModelRef<string[]> = defineModel<string[]>({ default: [] })
const inputRef: Ref<HTMLInputElement | null> = ref<HTMLInputElement | null>(null)
</script>

<template>
  <div
    class="relative cursor-text rounded-md border-2 border-black/50 p-2 focus-within:border-blue-900"
    @click="inputRef?.focus()"
  >
    <div class="flex flex-wrap items-center">
      <InputLabel :inputId="inputId">
        <slot />
      </InputLabel>
      <span
        v-for="item in model"
        :key="item"
        class="m-1 flex w-fit items-center rounded-xl bg-gray-300 p-2 text-sm"
      >
        {{ item }}
        <span
          @click="
            () => {
              model = model.filter((i) => i !== item)
            }
          "
          class="ml-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-gray-500"
        >
          <CancelIcon />
        </span>
      </span>
      <input
        ref="inputRef"
        class="w-[200px] p-2 outline-none"
        type="text"
        :id="inputId"
        @keydown.enter="
          (event: Event) => {
            event.preventDefault()
            if (inputRef.value.trim()) {
              model = [...model, inputRef.value]
              inputRef.value = ''
            }
          }
        "
      />
    </div>
  </div>
</template>
