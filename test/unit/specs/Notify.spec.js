import Vue from 'vue'
import Notify from 'src/components/Notify.vue'

// helper function that mounts and returns the rendered text
const vmBuilder = Vue => components => propsData => {
  return new Vue({
    template: '<div><notify :notes="notes" :baseMultiplier=0></notify></div>',
    data: function () { return propsData },
    components: components
  })
}

const getVm = vmBuilder(Vue)({ notify: Notify })

describe('Notify.vue structure', () => {
  it('should render properly', () => {
    const notes = [
      {
        header: 'Header lorem',
        body: 'Body lorem',
        level: 'warning'
      }
    ]
    const vm = getVm({ notes: notes }).$mount()

    expect(vm.$el.querySelector('.notifications .warning h3').textContent).to.equal('Header lorem')
    expect(vm.$el.querySelector('.notifications .warning p').textContent).to.equal('Body lorem')
  })

  it('should validate that the info element leave the screen', done => {
    const notes = [
      {
        header: 'header1',
        body: 'body1',
        level: 'info',
        duration: 1
      },
      {
        header: 'header2',
        body: 'body2',
        level: 'error'
      }
    ]

    const vm = getVm({ notes: notes }).$mount()

    expect(vm.$el.querySelector('.notifications .error h3').textContent).to.equal('header2')
    expect(vm.$el.querySelector('.notifications .info h3').textContent).to.equal('header1')

    setTimeout(() => {
      expect(vm.$el.querySelector('.notifications .info h3')).to.equal(null)
      done()
    }, 1000)
  })

  it('should delete a element from a list', () => {
    const notes = [
      {
        header: 'header1',
        body: 'body1',
        level: 'error',
        duration: 1
      },
      {
        header: 'header2',
        body: 'body2',
        level: 'error'
      }
    ]
    const expectations = ['header2']
    const vm = getVm({notes: notes}).$mount()
    console.log(vm.$el.querySelector('.notifications .close').click())

    // expect(vm.$data.notes.map(x => x.header)).to.equal(expectations)
  })
})
