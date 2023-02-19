import type { App } from 'vue'
import ExLoading from './src/ExLoading.vue'
 
ExLoading.install = (app: App): void => {
  app.component(ExLoading.__name as string, ExLoading)
}
 
export default ExLoading
