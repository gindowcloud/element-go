import mintTable from './mintTable/index.js'

const components = [mintTable]
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
  mintTable
}
