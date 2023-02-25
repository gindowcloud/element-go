import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementGo from '../packages/lib'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(ElementGo)
app.mount('#app')
