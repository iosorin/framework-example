import { $ } from '@core/dom';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);

        this.components = options.components || [];
    }

    getRoot() {
        // Create root Dom instancte
        const $root = $.create('div', 'excel');

        // Waklhrough all passed components
        this.components.forEach((Component) => {
            // Create El instance with a passed static className
            const $el = $.create('div', Component.className);

            // Pass it to DomListener constructor
            const component = new Component($el);

            // Append component inner html
            $el.html(component.toHtml());

            // Add self to root element
            $root.append($el);
        });

        return $root;
    }

    render() {
        const $root = this.getRoot();

        this.$el.append($root);
    }
}
