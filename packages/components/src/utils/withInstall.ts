import type { App, Component } from 'vue'

export const withInstall = <T extends Component>(component: T) => {
    const comp = component as any;
    comp.install = (app: App) => {
        app.component(comp.__name, component)
    };
    return component as T;
};
