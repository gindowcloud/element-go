import type { App } from 'vue'
import Pagination from './src/pagination.vue'
 
Pagination.install = (app: App): void => {
    app.component('ex-pagination', Pagination)
}
 
export default Pagination
