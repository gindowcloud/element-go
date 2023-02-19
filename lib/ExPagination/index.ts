import type { App } from 'vue'
import ExPagination from './src/ExPagination.vue'
 
ExPagination.install = (app: App): void => {
  app.component(ExPagination.__name as string, ExPagination)
}
 
export default ExPagination
