import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Select } from '../src'

describe('SelectComponent', () => {
  it('renders options correctly', async () => {
    const options = [
      { value: 'option1', name: 'Option 1' },
      { value: 'option2', name: 'Option 2' },
    ]

    const wrapper = shallowMount(Select, {
      props: { options },
    })

    const optionElements = wrapper.findAll('option')
    expect(optionElements.length).toBe(options.length)

    expect(optionElements[0].text()).toBe('Option 1')
    expect(optionElements[1].text()).toBe('Option 2')
  })

  it('updates v-model when an option is selected', async () => {
    const options = [
      { value: 'option1', name: 'Option 1' },
      { value: 'option2', name: 'Option 2' },
    ]

    const wrapper = shallowMount(Select, {
      props: { options },
      modelValue: 'option1',
    })

    const select = wrapper.find('select')

    await select.setValue('option2')

    expect(wrapper.emitted('update:modelValue')![0][0]).toBe('option2')
  })
})
