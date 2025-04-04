import { VueWrapper } from "@vue/test-utils";
import { expect } from "vitest";

/**
 * Tests that a component's size changes correctly based on the `size` prop.
 * @param wrapper - The component wrapper instance
 * @param selector - The CSS selector for the element whose size should change
 * @param sizes - An object mapping size props to expected CSS class values
 */
export async function testSizeChange(
  wrapper: VueWrapper<any>,
  selector: string,
  sizes: Record<string, string>,
) {
  for (const [size, expectedClass] of Object.entries(sizes)) {
    await wrapper.setProps({ size });
    await wrapper.vm.$nextTick();
    expect(wrapper.find(selector).classes()).toContain(expectedClass);
  }
}
