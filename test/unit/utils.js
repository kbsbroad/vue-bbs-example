import Vue from 'vue'

/**
 * 테스트 대상 컴포넌트에 필요한 요소들을 감싸기 위한 HOC
 * @param {*} WrappedComponent
 */
export const wrapTestComponent = ({ router, store }) => {
  return function(WrappedComponent) {
    const componentName = WrappedComponent.name || 'target'
    const ref = camelCase(componentName)

    const template = `
      <v-app>
        <wrapped-component ref="${ref}"></wrapped-component>
      </v-app>
    `

    const vm = new Vue({
      router,
      store,
      components: {
        'wrapped-component': WrappedComponent
      },
      template,
      methods: {
        getComponent() {
          return this.$refs[ref]
        }
      }
    })

    return vm
  }
}

/**
 * str to camel case
 * @param {*} input
 */
export const camelCase = (input) => {
  let str = input.toLowerCase().replace(/-(.)/g, function(match, group1) {
    return group1.toUpperCase()
  })
  str = str.replace(/_(.)/g, function(match, group1) {
    return group1.toUpperCase()
  })
  return str
}
