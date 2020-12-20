// 获取 components 文件夹下所有 index.vue 文件

export default {
  install: Vue => {
    const componentFiles = require.context('./', true, /index\.vue$/)
    const components = componentFiles.keys().map(item => {
      const componentName = item
        .match(/([a-z]*)/gi)
        .filter(a => a)
        .reverse()
        .splice(1)
        .filter((a, b) => !(b == 0 && a == 'index'))
        .reverse()
        .map(a => a[0].toUpperCase() + a.substr(1))
        .join('')
        .replace(/-[a-z]/g, a => a[1].toUpperCase())
      const file = componentFiles(item).default
      Vue.component(componentName, file)
      return [componentName, file]
    })

    if (process.env.NODE_ENV != 'production') {
      // eslint-disable-next-line no-console
      console.log('components', components)
    }
  }
}
