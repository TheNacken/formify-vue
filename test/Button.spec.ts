import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Button } from '../src'

describe('ButtonComponent', () => {
  it('renders the assigned label', async () => {
    const label = 'Click me'
    const wrapper = shallowMount(Button, {
      props: { label },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('input').attributes('value')).toBe(label)
  })

  it('emits the click event', async () => {
    const wrapper = shallowMount(Button, {
      props: { label: '' },
    })

    await wrapper.find('input').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
