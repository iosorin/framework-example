import { isEqual } from '@core/utils';

export class StoreSubscriber {
    constructor(store) {
        this.store = store;
        this.sub = null;

        this.prevState = {};
    }

    subscribeComponents(components) {
        this.prevState = this.store.getState();

        this.sub = this.store.subscribe((state) => {
            Object
                .keys(state)
                .forEach((key) => {
                    const hasChanges = !isEqual(this.prevState[key], state[key]);

                    if (hasChanges) {
                        components.forEach((component) => {
                            if (component.isWatching(key)) {
                                const changes = { [key]: state[key] };

                                component.storeChanged(changes);
                            }
                        });
                    }
                });

            this.prevState = this.store.getState();

            if (process.environment === 'development') {
                window.storeState = this.prevState;
            }
        });
    }

    unsubscribeFromStore() {
        this.sub.unsubscribe();
    }
}
