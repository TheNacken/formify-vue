import { describe, it, expect, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { TextInput } from '../src'

describe('TextInputComponent', () => {
  it('renders the slot content', () => {
    const label = 'Enter text'
    const wrapper = mount(TextInput, {
      props: { inputId: 'text-input' },
      slots: { default: label },
    })
    expect(wrapper.text()).toContain(label)
  })

  it('sets the id attribute on the textarea', () => {
    const wrapper = shallowMount(TextInput, {
      props: { inputId: 'text-area' },
    })
    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('id')).toBe('text-area')
  })

  it('emits update:modelValue when textarea value changes', async () => {
    const wrapper = shallowMount(TextInput, {
      props: { inputId: 'text-input', modelValue: '' },
    })
    const textarea = wrapper.find('textarea')
    await textarea.setValue('Hello World')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['Hello World'])
  })

  it('focuses textarea when container is clicked', async () => {
    const wrapper = mount(TextInput, {
      props: { inputId: 'focus-test' },
    })
    const textareaEl = wrapper.find('textarea').element as HTMLTextAreaElement
    const focusSpy = vi.spyOn(textareaEl, 'focus')
    await wrapper.find('div').trigger('click')
    expect(focusSpy).toHaveBeenCalled()
  })
})
