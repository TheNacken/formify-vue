# formify-vue 🚀✨

![Version](https://img.shields.io/npm/v/formify-vue?color=blue&label=version) ![Build](https://img.shields.io/github/actions/workflow/status/TheNacken/formify-vue/build.yml?branch=master&label=build&logo=github) ![License](https://img.shields.io/npm/l/formify-vue?color=green)

`formify-vue` is a modern Vue 3 component library designed to simplify the creation and management of form elements in web applications. It provides a collection of reusable, customizable, and accessible components that integrate seamlessly with Tailwind CSS for styling. Built with TypeScript, `formify-vue` ensures type safety and a better developer experience, making it an ideal choice for building robust and maintainable forms.

## Features 🌟

### Comprehensive Form Components

`formify-vue` offers a wide range of form components, including:

- **Button**: A customizable button component for various use cases.
- **Checkbox**: A versatile checkbox component supporting single and grouped selections.
- **MultipleSelect**: A multi-select component with autocomplete and custom option support.
- **NumberInput**: A number input component with configurable min, max, and step values.
- **Select**: A dropdown select component with customizable options.
- **Slider**: An interactive slider component with markers and value validation.
- **TextInput**: A simple text input component for user input.

### Tailwind CSS Integration 🎨

All components are styled using Tailwind CSS, ensuring a consistent and modern look and feel. Developers can easily extend or override styles to match their application's design system.

### TypeScript Support 🛠️

Built with TypeScript, `formify-vue` provides type safety and autocompletion, reducing runtime errors and improving developer productivity.

### Accessibility ♿

The components are designed with accessibility in mind, ensuring compatibility with screen readers and keyboard navigation.

### Lightweight and Fast ⚡

Utilizing Vite for development and bundling, `formify-vue` ensures a fast and efficient development experience with hot module replacement and optimized builds.

### Customization 🎛️

Each component is highly customizable, allowing developers to tailor functionality and appearance to their specific needs.

### Modular Design 🧩

The library is modular, enabling developers to import only the components they need, reducing bundle size and improving performance.

# Installation

To install `formify-vue`, you can use npm. Run the following command in your project directory:

```sh
npm install formify-vue
```

# Usage

To use `formify-vue` in your Vue 3 project, you need to first import the css file using a global import in your main css file or in your main.js file:

main.js

```javascript
import 'formify-vue/style.css'
```

main.css

```css
@import 'formify-vue/style.css';
```

Then, you can import the components you need in your Vue components. For example:

```javascript
import {
  Button,
  Checkbox,
  InputLabel,
  MultipleSelect,
  NumberInput,
  Select,
  Slider,
} from 'formify-vue'
```

## Components

### Button

A customizable button component that can be used anywhere a simple interactive button is needed.

**Props:**

- `label` (string, required): The text displayed on the button.

**Usage:**

```vue
<script setup>
import { Button } from 'formify-vue'

const handleClick = () => {
  console.log('Button clicked!')
}
</script>

<template>
  <Button label="Click Me" @click="handleClick" />
</template>
```

### Checkbox

A checkbox component that supports different sizes and states with built-in validation for both boolean and array models.

**Props:**

- `name` (string, required): The name attribute for the checkbox.
- `value` (string, required): The value associated with the checkbox.
- `inputId` (string, required): The ID of the checkbox input.
- `size` (string, required): The size of the checkbox. Options: `sm`, `md`, `lg`, `xl`.

**v-model:**

- Type: `boolean | string[]`
- Description: Binds the checked state of the checkbox. For single checkboxes, it is a `boolean`. For grouped checkboxes, it is an array of selected values.

**Usage:**

```vue
<script setup>
import { Checkbox } from 'formify-vue'
import { ref } from 'vue'

const checked = ref(false)
const selectedValues = ref([])
</script>

<template>
  <!-- Single Checkbox -->
  <Checkbox name="example" value="test" inputId="checkbox1" size="md" v-model="checked"
    >Accept Terms</Checkbox
  >

  <!-- Grouped Checkboxes -->
  <Checkbox name="group" value="option1" inputId="checkbox2" size="md" v-model="selectedValues"
    >Option 1</Checkbox
  >
  <Checkbox name="group" value="option2" inputId="checkbox3" size="md" v-model="selectedValues"
    >Option 2</Checkbox
  >
</template>
```

### MultipleSelect

A multi-select component featuring a customizable input field, allowing for dynamic addition and removal of options.

**Props:**

- `inputId` (string, required): The ID of the input element.
- `autocompleteOptions` (array, optional): Options for autocomplete suggestions.
- `allowCustom` (boolean, optional, default: `true`): Whether custom options are allowed.
- `preventDuplicates` (boolean, optional, default: `true`): Whether duplicate options are prevented.

**v-model:**

- Type: `string[]`
- Description: Binds the array of selected items.

**Usage:**

```vue
<script setup>
import { MultipleSelect } from 'formify-vue'
import { ref } from 'vue'

const selectedItems = ref([])
const options = ['Option 1', 'Option 2', 'Option 3']
</script>

<template>
  <MultipleSelect inputId="multi-select" v-model="selectedItems" :autocompleteOptions="options"
    >Select Items</MultipleSelect
  >
</template>
```

### NumberInput

A number input component built with support for minimum, maximum, and step values.

**Props:**

- `min` (number, optional): The minimum value.
- `max` (number, optional): The maximum value.
- `step` (number, optional): The step value.
- `inputId` (string, required): The ID of the input element.
- `prefix` (string, optional): A prefix displayed before the input.
- `suffix` (string, optional): A suffix displayed after the input.

**v-model:**

- Type: `number`
- Description: Binds the numeric value of the input.

**Usage:**

```vue
<script setup>
import { NumberInput } from 'formify-vue'
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <NumberInput
    inputId="number-input"
    v-model="value"
    :min="0"
    :max="100"
    :step="1"
    prefix="$"
    suffix="%"
    >Enter Value</NumberInput
  >
</template>
```

### Select

A dropdown select component with customizable options.

**Props:**

- `options` (array, required): An array of objects with `name` and `value` properties for the dropdown options.

**v-model:**

- Type: `string`
- Description: Binds the selected value of the dropdown.

**Usage:**

```vue
<script setup>
import { Select } from 'formify-vue'
import { ref } from 'vue'

const selected = ref('')
const options = [
  { name: 'Option 1', value: 'option1' },
  { name: 'Option 2', value: 'option2' },
]
</script>

<template>
  <Select v-model="selected" :options="options">Choose an Option</Select>
</template>
```

### Slider

An interactive slider component with markers, value validation, and a dynamic progress indicator.

**Props:**

- `min` (number, optional, default: `0`): The minimum value.
- `max` (number, optional, default: `100`): The maximum value.
- `step` (number, optional, default: `1`): The step value.
- `markers` (array, optional): An array of marker values to display on the slider.

**v-model:**

- Type: `number`
- Description: Binds the numeric value of the slider.

**Usage:**

```vue
<script setup>
import { Slider } from 'formify-vue'
import { ref } from 'vue'

const sliderValue = ref(50)
</script>

<template>
  <Slider v-model="sliderValue" :min="0" :max="100" :step="10" :markers="[0, 25, 50, 75, 100]"
    >Adjust Value</Slider
  >
</template>
```

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

Run the following command to install all dependencies:

```sh
npm install
```
