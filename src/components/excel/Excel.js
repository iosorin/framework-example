import { $ } from '@core/dom';
import { Emmiter } from '@core/Emmiter';
import { StoreSubscriber } from '../../core/StoreSubscriber';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);

        this.components = options.components || [];

        this.store = options.store;
        this.subscriber = new StoreSubscriber(this.store);

        this.emmiter = new Emmiter();
    }

    getRoot() {
        // Create root Dom instancte
        const $root = $.create('div', 'excel');

        // Component options
        const options = {
            emmiter: this.emmiter,
            store: this.store
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

        this.subscriber.subscribeComponents(this.components);
        this.components.forEach(component => component.init());
    }

    destroy() {
        this.subscriber.unsubscribeFromStore();
        this.components.forEach(component => component.destroy());
    }
}
