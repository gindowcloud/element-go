import type { App } from 'vue'
import component from './ExSearch.vue'
 
component.install = (app: App): void => {
  app.component(component.__name as string, component)
}
 
export default component
