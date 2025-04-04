import { describe, it, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { NumberInput } from '../src'

describe('NumberInputComponent', () => {
  it('renders slot content', () => {
    const text = 'Hello World'
    const wrapper = mount(NumberInput, {
      slots: {
        default: text,
      },
      props: {
        min: 0,
        max: 100,
        step: 1,
        inputId: 'input-id',
      },
    })

    expect(wrapper.text()).toContain(text)
  })

  it('sets the min, max, step and id attributes', () => {
    const wrapper = shallowMount(NumberInput, {
      props: {
        min: 0,
        max: 100,
        step: 1,
        inputId: 'input-id',
      },
    })

    const input = wrapper.find('input')

    expect(input.attributes('min')).toBe('0')
    expect(input.attributes('max')).toBe('100')
    expect(input.attributes('step')).toBe('1')
    expect(input.attributes('id')).toBe('input-id')
  })

  it('updates the model value', async () => {
    const wrapper = shallowMount(NumberInput, {
      props: {
        min: 0,
        max: 100,
        step: 1,
        inputId: 'input-id',
        modelValue: 0,
      },
    })

    const input = wrapper.find('input')

    await input.setValue(10)

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([10])
  })
})
