import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementGo from '../../core/src'
import 'element-plus/dist/index.css'
import './styles/index.css'

const app = createApp(App)
app.use(router)
app.use(ElementGo)
app.mount('#app')
