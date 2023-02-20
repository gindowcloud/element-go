import type { App } from 'vue'
import ExLoading from './ExLoading'
import ExPageHeader from './ExPageHeader'
import ExPagination from './ExPagination'
import ExFormSearch from './ExFormSearch'
import ExTable from './ExTable'
 
// 所有组件列表
const components = [ 
  ExLoading,
  ExPageHeader,
  ExPagination,
  ExFormSearch,
  ExTable
]
const install = (app: App): void => {    
  components.map((component) => app.component(component.__name as string, component))
}

export {
  install as default,
  ExLoading,
  ExPageHeader,
  ExPagination,
  ExFormSearch,
  ExTable
}
