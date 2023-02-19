
import type { App } from 'vue'
import ExLoading from './loading'
import ExPagination from './pagination'
 
// 所有组件列表
const components = [ ExLoading, ExPagination ]
const install = (app: App): void => {    
    components.map((component) => app.component(component.name, component))
}
 
export { ExLoading, ExPagination }

export default { install }
