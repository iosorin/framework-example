import { $ } from '@core/dom';
import { Emmiter } from '@core/Emmiter';
import { StoreSubscriber } from '@core/StoreSubscriber';
import { updateDate } from '@store/actions';

export class Excel {
    constructor(options) {
        this.components = options.components || [];
        this.store = options.store;
        this.subscriber = new StoreSubscriber(this.store);
        this.emmiter = new Emmiter();
    }

    getRoot() {
        // Create root Dom instancte
        const $pageRoot = $.create('div', 'excel');

        // Component options
        const options = {
            emmiter: this.emmiter,
            store: this.store
        };

        // Waklhrough all passed components
        this.components = this.components.map((Component) => {
            const $componentRoot = $.create('div', Component.className);
            const component = new Component($componentRoot, options);

            $componentRoot.html(component.toHtml());
            $pageRoot.append($componentRoot);

            return component;
        });

        return $pageRoot;
    }

    init() {
        this.store.dispatch(updateDate());

        this.subscriber.subscribeComponents(this.components);
        this.components.forEach(component => component.init());
    }

    destroy() {
        this.subscriber.unsubscribeFromStore();
        this.components.forEach(component => component.destroy());
    }
}
