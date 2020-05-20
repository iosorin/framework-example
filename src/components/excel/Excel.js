import { $ } from '@core/dom';
import { Emmiter } from '@core/Emmiter';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);

        this.emmiter = new Emmiter();
        this.components = options.components || [];
    }

    getRoot() {
        // Create root Dom instancte
        const $root = $.create('div', 'excel');

        // Component options
        const options = {
            emmiter: this.emmiter
        };

        // Waklhrough all passed components
        this.components = this.components.map((Component) => {
            // Create El instance with a passed static className
            const $el = $.create('div', Component.className);

            // Pass it to DomListener, ExcelComponent constructors
            const component = new Component($el, options);

            // Append component inner html
            $el.html(component.toHtml());

            // Add self to root element
            $root.append($el);

            return component;
        });

        return $root;
    }

    render() {
        const $root = this.getRoot();

        this.$el.append($root);

        this.components.forEach(component => component.init());
    }

    destroy() {
        this.components.forEach(component => component.destroy());
    }
}
