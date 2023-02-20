import type { App } from 'vue'
import ExLoading from './ExLoading'
import ExPagination from './ExPagination'
import ExPageHeader from './ExPageHeader'
 
// 所有组件列表
const components = [ 
  ExLoading,
  ExPagination,
  ExPageHeader
]
const install = (app: App): void => {    
  components.map((component) => app.component(component.__name as string, component))
}
 
export {
  ExLoading,
  ExPagination,
  ExPageHeader
}

export default { install }
