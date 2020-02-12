import exTable from './exTable/index.js'

const components = [exTable]
const install = function(vue) {
  if (install.installed) return;
  components.map((component) => {
    vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
  install,
  exTable
}
