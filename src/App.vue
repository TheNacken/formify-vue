<script setup lang="ts">
import NumberInput from './NumberInput.vue'
import Checkbox from './Checkbox.vue'
import MultipleSelect from './MultipleSelect.vue'
import Select from './Select.vue'
import Slider from './Slider.vue'
import { ref } from 'vue'

const sliderValue = ref(0)
</script>

<template>
  <NumberInput :min="0" :max="100" :step="1" inputId="number-input"> Percentage</NumberInput>
  <Checkbox name="checkbox-input" value="test" input-id="checkbox-input" size="md"></Checkbox>
  <MultipleSelect input-id="multiple-select-input"></MultipleSelect>
  <Select :options="[{name: 'test', value: 'test'}]" input-id="select-input"></Select>
  <Slider v-model="sliderValue" ></Slider>
</template>

<style scoped></style>
