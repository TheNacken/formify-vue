# formify-vue

`formify-vue` is a Vue 3 component library designed to simplify the creation and management of form elements. It provides a set of customizable components that integrate smoothly with Tailwind CSS for styling and Vite for a fast development experience. The components are built with TypeScript to ensure type safety and better developer experience.

## Features

- **TypeScript and Vue 3**: Built with modern TypeScript and Vue 3, ensuring robust and maintainable code.
- **Modular Components**: A collection of form elements including buttons, checkboxes, number inputs, selects, sliders, and more.
- **Tailwind CSS Integration**: Components are styled using Tailwind CSS for a consistent look and feel.
- **Fast Development**: Utilizes Vite for efficient bundling, hot module replacement, and fast iteration.
- **Type Safety**: Uses `vue-tsc` for type checking to provide seamless support for TypeScript in `.vue` files.

# Installation
To install `formify-vue`, you can use npm. Run the following command in your project directory:

```sh
npm install formify-vue
```

# Usage

To use `formify-vue` in your Vue 3 project, you need to first import the css file using a global import in your main css file or in your main.js file:

main.js
```javascript
import 'formify-vue/style.css';
```
main.css
```css
@import 'formify-vue/style.css';
```

Then, you can import the components you need in your Vue components. For example:

```javascript
import { Button, Checkbox, InputLabel, MultipleSelect, NumberInput, Select, Slider } from 'formify-vue';
```

Then, you can import the components you need in your Vue components. For example:

## Components

### Button

A customizable button component that can be used anywhere a simple interactive button is needed.

### Checkbox

A checkbox component that supports different sizes and states with built-in validation for both boolean and array models.

### InputLabel

A label component specifically designed for form inputs.

### MultipleSelect

A multi-select component featuring a customizable input field, allowing for dynamic addition and removal of options.

### NumberInput

A number input component built with support for minimum, maximum, and step values.

### Select

A dropdown select component with customizable options.

### Slider

An interactive slider component with markers, value validation, and a dynamic progress indicator.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation

Run the following command to install all dependencies:

```sh
npm install