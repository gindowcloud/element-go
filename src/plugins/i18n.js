import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocaleUI from 'element-ui/lib/locale/lang/en'
import zhLocaleUI from 'element-ui/lib/locale/lang/zh-CN'
import enLocaleGO from '../../lib/locale/lang/en'
import zhLocaleGO from '../../lib/locale/lang/zh-CN'

Vue.use(VueI18n)

export default new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            ...enLocaleUI,
            ...enLocaleGO
        },
        zh: {
            ...zhLocaleUI,
            ...zhLocaleGO
        }
    }
})