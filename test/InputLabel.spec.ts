import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { InputLabel } from '../src'

describe('InputLabelComponent', () => {
  it('renders the slot content', () => {
    const text = 'Hello'
    const wrapper = shallowMount(InputLabel, {
      props: {
        inputId: 'value',
      },
      slots: {
        default: text,
      },
    })

    expect(wrapper.text()).toBe(text)
  })

  it('sets the for attribute', () => {
    const wrapper = shallowMount(InputLabel, {
      props: {
        inputId: 'value',
      },
    })

    expect(wrapper.attributes('for')).toBe('value')
  })
})
