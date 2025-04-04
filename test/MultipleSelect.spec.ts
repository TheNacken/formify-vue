import { describe, expect, it, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { MultipleSelect } from '../src'

describe('MultipleSelectComponent', () => {
  it('renders the slot content', () => {
    const text = 'Hello'
    const wrapper = mount(MultipleSelect, {
      props: {
        inputId: 'value',
      },
      slots: {
        default: text,
      },
    })

    expect(wrapper.text()).toBe(text)
  })

  it('sets the id attribute', () => {
    const wrapper = shallowMount(MultipleSelect, {
      props: {
        inputId: 'value',
      },
    })

    expect(wrapper.find('input').attributes('id')).toBe('value')
  })

  it('focuses the input when the container is clicked', async () => {
    const wrapper = shallowMount(MultipleSelect, {
      props: { inputId: 'tag-input' },
    })
    const input = wrapper.find('input').element as HTMLInputElement

    const focusSpy = vi.spyOn(input, 'focus')
    await wrapper.find('div.relative').trigger('click')
    expect(focusSpy).toHaveBeenCalled()
  })

  it('adds a tag when the Enter key is pressed', async () => {
    const wrapper = shallowMount(MultipleSelect, {
      props: {
        inputId: 'tag-input',
        'update:modelValue': () => {
          return ['NewTag']
        },
      },
    })
    const inputWrapper = wrapper.find('input')
    const input = inputWrapper.element as HTMLInputElement

    input.value = 'NewTag'
    await inputWrapper.trigger('keydown.enter')

    expect(input.value).toBe('')
    expect(wrapper.html()).toContain('NewTag')
  })

  it('removes a tag when the cancel icon is clicked', async () => {
    const wrapper = shallowMount(MultipleSelect, {
      props: {
        inputId: 'tag-input',
        modelValue: ['TagToRemove'],
        'update:modelValue': () => {
          return []
        },
      },
    })

    const tagSpan = wrapper.findAll('span.m-1').find((span) => span.text().includes('TagToRemove'))
    expect(tagSpan).toBeDefined()

    if (tagSpan) {
      const cancelButton = tagSpan.find('span.ml-2')
      await cancelButton.trigger('click')
    }

    expect(wrapper.text()).not.toContain('TagToRemove')
  })
})
