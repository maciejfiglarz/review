import { h, render } from "preact";



class Component {

    constructor(container, component) {
        this.container = container;
        this.component = component;
        // this.api = {};
    }

    render() {
        const content = this.container.cloneNode(true);
        const data = { ...this.container.dataset || {} };

        this.container.innerHTML = '';
        render(h(this.component, {
            content: content,
            container:
                this.container,
            api: (methods) => {
                this.api = methods
            },
            ...data
        }), this.container);
    }
}

export default Component;