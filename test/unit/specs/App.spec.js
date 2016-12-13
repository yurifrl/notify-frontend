import Vue from 'vue'
import App from 'src/App.vue'

// helper function that mounts and returns the rendered text
const vmBuilder = Vue => components => props => {
  return new Vue({
    template: '<div id="app"></app>',
    name: 'app',
    components: components,
    data: function () {
      return props
    }
  })
}

const getVm = vmBuilder(Vue)({app: App})

describe('App.vue', () => {
  it('should render correct contents', () => {
    const props = {
      notes: [],
      header: 'Header lorem',
      body: 'Body lorem',
      duration: 90,
      level: 'warning'
    }
    const vm = getVm(props).$mount()
    console.log(vm.$el)
  })
})
