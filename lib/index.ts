import type { App } from 'vue'
import ExLoading from './loading'
import ExPagination from './pagination'
 
// 所有组件列表
const components = [ 
    { name: 'ex-loading', component: ExLoading }, 
    { name: 'ex-pagination', component: ExPagination }
]
const install = (app: App): void => {    
    components.map(({ name, component }) => app.component(name, component))
}
 
export { ExLoading, ExPagination }

export default { install }
