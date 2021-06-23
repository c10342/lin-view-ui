import { mount } from '@vue/test-utils';

import Backtop from '../index.js';

function sleep(){
  return new Promise((resolve,reject)=>{
    setTimeout(resolve,1000)
  })
}

const _mount = (template) => mount({
  components: {
    'lin-backtop': Backtop,
  },
  template,
}, { attachTo: document.body })

describe('Backtop', () => {
  test('render', async () => {
    const wrapper = _mount(`
      <div class="target" style="height: 100px; overflow: auto">
        <div style="height: 10000px; width: 100%">
          <lin-backtop target=".target" :visibilityHeight="2000" :right="100" :bottom="200" />
        </div>
      </div>
    `)
    expect(wrapper.find('.lin-backtop').exists()).toBe(false)
    wrapper.element.scrollTop = 2000
    await wrapper.trigger('scroll')
    expect(wrapper.find('.lin-backtop').exists()).toBe(true)

    expect(wrapper.find('.lin-backtop').attributes('style')).toBe('right: 100px; bottom: 200px;')
    expect(wrapper.find('.lin-backtop-triangle').exists()).toBe(true)
    wrapper.element.scrollTop = 0
    await wrapper.find('.lin-backtop').trigger('click')
    await wrapper.trigger('scroll')
    await sleep()
    expect(wrapper.find('.lin-backtop').exists()).toBe(false)
    console.log(wrapper.emitted());
    expect(wrapper.emitted().click).toBeTruthy()
    expect(wrapper.emitted().scroll).toBeTruthy()
    expect(wrapper.emitted().end).toBeTruthy()
  })
})
