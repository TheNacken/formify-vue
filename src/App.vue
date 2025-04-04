<script setup lang="ts">
import { NumberInput, Checkbox, MultipleSelect, Slider } from './index'
import TextInput from '@/TextInput.vue'
</script>

<template>
  <div>
    <NumberInput :min="0" :max="100" :step="1" prefix="$" suffix="€" inputId="number-input">
      Percentage</NumberInput
    >
    <NumberInput :min="0" :max="100" :step="1" suffix="€" inputId="number-input">
      Percentage</NumberInput
    >
    <NumberInput :min="0" :max="100" :step="1" prefix="$" inputId="number-input">
      Percentage</NumberInput
    >
    <NumberInput :min="0" :max="100" :step="1" inputId="number-input"> Percentage</NumberInput>
  </div>
  <Checkbox name="checkbox-input" value="test" input-id="checkbox-input" size="md"></Checkbox>
  <MultipleSelect input-id="multiple-select-input">Test</MultipleSelect>
  <Select :options="[{ name: 'test', value: 'test' }]" input-id="select-input"></Select>
  <Slider></Slider>
  <TextInput input-id="text-input"></TextInput>
</template>
