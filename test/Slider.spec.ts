import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Slider } from '../src'

describe('SliderComponent', () => {
  it('renders correctly with default props', () => {
    const wrapper = shallowMount(Slider, {
      props: { modelValue: 50 },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.bg-gray-500').exists()).toBe(true)
    expect(wrapper.find('.bg-green-500').exists()).toBe(true)
  })

  it('clamps value within min and max', async () => {
    const wrapper = shallowMount(Slider, {
      props: { modelValue: 150, min: 0, max: 100 },
    })

    expect(wrapper.vm.model).toBe(100)
    await wrapper.setProps({ modelValue: -10 })
    expect(wrapper.vm.model).toBe(0)
  })

  it('respects step increments', async () => {
    const wrapper = shallowMount(Slider, {
      props: { modelValue: 0, min: 0, max: 10, step: 2 },
    })

    await wrapper.setProps({ modelValue: 3 })
    expect(wrapper.vm.model).toBe(4)

    await wrapper.setProps({ modelValue: 7 })
    expect(wrapper.vm.model).toBe(8)
  })

  it('updates value when dragging', async () => {
    const wrapper = shallowMount(Slider, {
      props: { modelValue: 0, min: 0, max: 100 },
    })

    const slider = wrapper.find('div.cursor-pointer')
    expect(slider.exists()).toBe(true)

    await slider.trigger('mousedown', { clientX: 50 })

    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 200 }))
    window.dispatchEvent(new MouseEvent('mouseup'))

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('renders markers correctly', () => {
    const markers = [0, 25, 50, 75, 100]
    const wrapper = shallowMount(Slider, {
      props: { markers, modelValue: 50 },
    })

    const markerElements = wrapper.findAll('.h-3.w-px.bg-gray-400')
    expect(markerElements.length).toBe(markers.length)
  })

  it('shows tooltip when hovering or dragging', async () => {
    const wrapper = shallowMount(Slider, {
      props: { modelValue: 50 },
    })

    const handle = wrapper.find('.cursor-grab')
    expect(handle.exists()).toBe(true)

    await handle.trigger('mouseenter')
    expect(wrapper.find('.bg-gray-800').exists()).toBe(true)

    await handle.trigger('mouseleave')
    expect(wrapper.find('.bg-gray-800').exists()).toBe(false)
  })
})
