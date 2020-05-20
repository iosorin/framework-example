import { $ } from '@core/dom';
import { Observer } from '@core/Observer';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);

        this.observer = new Observer();
        this.components = options.components || [];
    }

    getRoot() {
        // Create root Dom instancte
        const $root = $.create('div', 'excel');

        // Component options
        const options = {
            observer: this.observer
        };

        // Waklhrough all passed components
        this.components = this.components.map((Component) => {
            // Create El instance with a passed static className
            const $el = $.create('div', Component.className);

            // Pass it to DomListener constructor
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
}
