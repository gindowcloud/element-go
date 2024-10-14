import type { App } from 'vue'
import ExLayout from './components/ExLayout/ExLayout.vue'
import ExMenu from './components/ExMenu.vue'
import ExEmpty from './components/ExEmpty.vue'
import ExLoading from './components/ExLoading.vue'
import ExPageHeader from './components/ExPageHeader.vue'
import ExFormSearch from './components/ExFormSearch.vue'
import ExTable from './components/ExTable.vue'
import ExPagination from './components/ExPagination.vue'
import ExPlayer from './components/ExPlayer.vue'
import './style.css'

// 所有组件列表
const components = [ 
  ExLayout,
  ExMenu,
  ExEmpty,
  ExLoading,
  ExPageHeader,
  ExFormSearch,
  ExTable,
  ExPagination,
  ExPlayer
]

const install = (app: App): void => {    
  components.map(component => app.component(component.__name as string, component))
}

components.forEach(component => {
  component.install = (app: App): void => { app.component(component.__name as string, component) }
})

export {
  install as default,
  ExLayout,
  ExMenu,
  ExEmpty,
  ExLoading,
  ExPageHeader,
  ExFormSearch,
  ExTable,
  ExPagination,
  ExPlayer
}
