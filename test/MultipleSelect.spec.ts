import { describe, expect, it, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { MultipleSelect } from '../src'

async function setInputValue(wrapper: any, value: string) {
  const input = wrapper.find('input')
  input.setValue(value)
  await input.trigger('input')
}

describe('MultipleSelectComponent', () => {
  it('renders the slot content', () => {
    const text = 'Hello'
    const wrapper = mount(MultipleSelect, {
      props: { inputId: 'value' },
      slots: { default: text },
    })

    expect(wrapper.text()).toContain(text)
  })

  it('sets the id attribute on the input', () => {
    const wrapper = shallowMount(MultipleSelect, {
      props: { inputId: 'value' },
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

  it('adds a tag when the Enter key is pressed (without active option)', async () => {
    const wrapper = mount(MultipleSelect, {
      props: {
        inputId: 'tag-input',
        autocompleteOptions: ['Option1', 'Option2'],
      },
    })

    const inputWrapper = wrapper.find('input')
    await setInputValue(wrapper, 'NewCustom')
    await inputWrapper.trigger('keydown.enter')

    expect(wrapper.find('input').element.value).toBe('')
    expect(wrapper.html()).toContain('NewCustom')
  })

  it('does not add a custom tag when allowCustom is false', async () => {
    const wrapper = mount(MultipleSelect, {
      props: {
        inputId: 'tag-input',
        autocompleteOptions: ['Option1', 'Option2'],
        allowCustom: false,
      },
    })

    const inputWrapper = wrapper.find('input')
    await setInputValue(wrapper, 'NotAllowed')

    await inputWrapper.trigger('keydown.enter')
    expect(wrapper.html()).not.toContain('NotAllowed')
  })

  it('adds an item from autocomplete options using arrow keys and enter', async () => {
    const options = ['Apple', 'Banana', 'Cherry']
    const wrapper = mount(MultipleSelect, {
      props: {
        inputId: 'tag-input',
        autocompleteOptions: options,
      },
    })

    await setInputValue(wrapper, 'a')
    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    await wrapper.find('input').trigger('keydown', { key: 'Enter' })

    expect(wrapper.html()).toContain('Apple')
  })

  it('prevents duplicate tags when preventDuplicates is true', async () => {
    const options = ['Alpha', 'Beta']
    const wrapper = mount(MultipleSelect, {
      props: {
        inputId: 'tag-input',
        autocompleteOptions: options,
        preventDuplicates: true,
      },
    })

    await setInputValue(wrapper, 'Alpha')
    await wrapper.find('input').trigger('keydown.enter')
    expect(wrapper.html()).toContain('Alpha')

    await setInputValue(wrapper, 'Alpha')
    await wrapper.find('input').trigger('keydown.enter')

    const occurrences = wrapper.html().match(/Alpha/g) || []
    expect(occurrences.length).toBe(1)
  })

  it('removes a tag when the cancel icon is clicked', async () => {
    const wrapper = mount(MultipleSelect, {
      props: { inputId: 'tag-input' },
      slots: { default: 'Label' },
    })

    const input = wrapper.find('input')
    await setInputValue(wrapper, 'TagToRemove')
    await input.trigger('keydown.enter')
    expect(wrapper.text()).toContain('TagToRemove')

    const tagSpan = wrapper.findAll('span.m-1').find((span) => span.text().includes('TagToRemove'))

    expect(tagSpan).toBeDefined()
    if (tagSpan) {
      const cancelButton = tagSpan.find('span.ml-2')
      await cancelButton.trigger('mousedown')
    }
    expect(wrapper.text()).not.toContain('TagToRemove')
  })

  it('filters the autocomplete options based on the input value', async () => {
    const options = ['Cat', 'Dog', 'Elephant']
    const wrapper = mount(MultipleSelect, {
      props: {
        inputId: 'tag-input',
        autocompleteOptions: options,
      },
    })

    const input = wrapper.find('input')
    await input.trigger('focus')

    await setInputValue(wrapper, '')
    let liItems = wrapper.findAll('ul li')
    expect(liItems.length).toBe(options.length)

    await setInputValue(wrapper, 'do')
    liItems = wrapper.findAll('ul li')

    expect(liItems.length).toBe(1)
    expect(liItems[0].text()).toBe('Dog')
  })

  it('handles keyboard navigation (ArrowUp and ArrowDown) correctly', async () => {
    const options = ['Red', 'Green', 'Blue']
    const wrapper = mount(MultipleSelect, {
      props: {
        inputId: 'tag-input',
        autocompleteOptions: options,
      },
    })

    const input = wrapper.find('input')
    await setInputValue(wrapper, 'e')
    await input.trigger('focus')

    await input.trigger('keydown', { key: 'ArrowDown' })
    let listItems = wrapper.findAll('ul li')
    expect(listItems[0].classes()).toContain('bg-gray-200')

    await input.trigger('keydown', { key: 'ArrowDown' })
    listItems = wrapper.findAll('ul li')
    expect(listItems[0].classes()).not.toContain('bg-gray-200')
    expect(listItems[1].classes()).toContain('bg-gray-200')

    await input.trigger('keydown', { key: 'ArrowUp' })
    listItems = wrapper.findAll('ul li')
    expect(listItems[0].classes()).toContain('bg-gray-200')
  })

  it('adds an option when the user clicks on an autocomplete option', async () => {
    const options = ['OptionA', 'OptionB', 'OptionC']
    const wrapper = mount(MultipleSelect, {
      props: {
        inputId: 'tag-input',
        autocompleteOptions: options,
      },
    })

    await setInputValue(wrapper, 'Opt')
    await wrapper.find('input').trigger('focus')
    const listItems = wrapper.findAll('ul li')
    await listItems[1].trigger('mousedown')

    expect(wrapper.html()).toContain('OptionB')
  })

  it('emits update:searchTerm when typing in the input', async () => {
    const wrapper = mount(MultipleSelect, {
      props: { inputId: 'search', autocompleteOptions: [] },
    })
    const input = wrapper.find('input')
    await input.setValue('test')
    expect(wrapper.emitted('update:searchTerm')).toBeTruthy()
    expect(wrapper.emitted('update:searchTerm')![0]).toEqual(['test'])
  })

  it('updates input value when searchTerm prop changes', async () => {
    const wrapper = mount(MultipleSelect, {
      props: { inputId: 'search', searchTerm: 'initial', autocompleteOptions: [] },
    })
    expect(wrapper.find('input').element.value).toBe('initial')
    await wrapper.setProps({ searchTerm: 'newValue' })
    expect(wrapper.find('input').element.value).toBe('newValue')
  })
})
