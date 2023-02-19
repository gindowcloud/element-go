import { createApp } from 'vue'
import App from './App.vue'
import ElementGo from '../lib'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementGo)
app.mount('#app')
