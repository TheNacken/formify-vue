<script setup lang="ts">
import { NumberInput, Checkbox, MultipleSelect, Select, Slider, TextInput, Button } from './index'
import { ref } from 'vue'

const multipleSelect = ref<string[]>([])
const autocompleteSelect = ref<string[]>([])
</script>

<template>
  <form>
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
    <Checkbox
      name="checkbox-input-sm"
      value="test"
      input-id="checkbox-input-sm"
      size="sm"
    ></Checkbox>
    <Checkbox
      name="checkbox-input-md"
      value="test"
      input-id="checkbox-input-md"
      size="md"
    ></Checkbox>
    <Checkbox
      name="checkbox-input-lg"
      value="test"
      input-id="checkbox-input-lg"
      size="lg"
    ></Checkbox>
    <Checkbox
      name="checkbox-input-xl"
      value="test"
      input-id="checkbox-input-xl"
      size="xl"
    ></Checkbox>
    <MultipleSelect input-id="multiple-select-input" v-model="multipleSelect">Test</MultipleSelect>
    <MultipleSelect
      input-id="multiple-select-input"
      v-model="autocompleteSelect"
      :autocomplete-options="['test', 'test2']"
      >Test</MultipleSelect
    >
    <Select
      :options="[
        { name: 'test', value: 'test' },
        { name: 'Testsetsetsetsteste', value: 'atdzatdwtuzdtatzdtaz' },
      ]"
      input-id="select-input"
      >Test</Select
    >
    <Slider></Slider>
    <Slider :max="100" :min="0" :step="1" :markers="[0, 25, 50, 75, 100]"></Slider>
    <TextInput class="h-50" input-id="text-input"></TextInput>
    <Button label="Test" @click="console.log('test')"></Button>
  </form>
</template>
