import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { testSizeChange } from './testHelpers'
import { Checkbox } from '../src'
import { CheckIcon } from '../src/icons'

describe('CheckboxComponent', () => {
  it('renders the slot content', () => {
    const text = 'Hello'
    const wrapper = shallowMount(Checkbox, {
      props: {
        name: 'name',
        value: 'value',
        inputId: 'value',
        size: 'sm',
      },
      slots: {
        default: text,
      },
    })

    expect(wrapper.text()).toBe(text)
  })

  it('changes the size according to the prop', async () => {
    const wrapper = shallowMount(Checkbox, {
      props: { name: 'name', value: 'value', inputId: 'value', size: 'sm' },
    })

    await testSizeChange(wrapper, 'input', {
      sm: 'size-3',
      md: 'size-5',
      lg: 'size-7',
      xl: 'size-9',
    })
  })

  it('sets the name, value and id attributes', () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        name: 'name',
        value: 'value',
        inputId: 'value',
        size: 'sm',
      },
    })

    expect(wrapper.find('input').attributes('name')).toBe('name')
    expect(wrapper.find('input').attributes('value')).toBe('value')
    expect(wrapper.find('input').attributes('id')).toBe('value')
  })

  //TODO - simplify this test, see: https://test-utils.vuejs.org/guide/advanced/v-model
  it('toggles checkbox correctly (boolean model)', async () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        name: 'test',
        value: 'option1',
        inputId: 'checkbox1',
        size: 'md',
        modelValue: false,
      },
    })

    const input = wrapper.find('input')

    await input.setValue(true)
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true])

    await input.setValue(false)
    expect(wrapper.emitted()['update:modelValue'][1]).toEqual([false])
  })

  it('adds and removes values correctly (array model)', async () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        name: 'test',
        value: 'option1',
        inputId: 'checkbox1',
        size: 'md',
        modelValue: ['option2'],
      },
    })

    const input = wrapper.find('input')

    await input.setValue(true)
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([['option2', 'option1']])

    await input.setValue(false)
    expect(wrapper.emitted()['update:modelValue'][1]).toEqual([['option2']])
  })

  it('displays CheckIcon when checked', async () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        name: 'test',
        value: 'option1',
        inputId: 'checkbox1',
        size: 'md',
        modelValue: true,
      },
    })

    expect(wrapper.findComponent(CheckIcon).exists()).toBe(true)

    await wrapper.setProps({ modelValue: false })

    expect(wrapper.findComponent(CheckIcon).exists()).toBe(false)
  })
})
