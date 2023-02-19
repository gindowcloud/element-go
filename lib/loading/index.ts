import type { App } from 'vue'
import Loading from './src/loading.vue'
 
Loading.install = (app: App): void => {
    app.component('ex-loading', Loading)
}
 
export default Loading
