import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/style.css'
import '@element-go/components/dist/style.css'

const app = createApp(App)
app.use(router).use(elementPlus)
// app.use(ElementGo)
app.mount('#app')
