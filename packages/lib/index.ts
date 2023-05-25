import type { App } from 'vue'
import ExLoading from './ExLoading'
import ExPageHeader from './ExPageHeader'
import ExPagination from './ExPagination'
import ExFormSearch from './ExFormSearch'
import ExTable from './ExTable'
import ExLayout from './ExLayout'
import ExPlayer from './ExPlayer'
import './style.css'

// 所有组件列表
const components = [ 
  ExLayout,
  ExPageHeader,
  ExFormSearch,
  ExTable,
  ExLoading,
  ExPagination,
  ExPlayer
]
const install = (app: App): void => {    
  components.map((component) => app.component(component.__name as string, component))
}

export {
  install as default,
  ExLayout,
  ExPageHeader,
  ExFormSearch,
  ExTable,
  ExLoading,
  ExPagination,
  ExPlayer
}
