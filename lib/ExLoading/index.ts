import type { App } from 'vue'
import component from './ExLoading.vue'
 
component.install = (app: App): void => {
  app.component(component.__name as string, component)
}
 
export default component
