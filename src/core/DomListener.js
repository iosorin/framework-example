import { capitalize } from '@core/utils';

const getMethodName = (eventName) => {
    return `on${ capitalize(eventName) }`;
};

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root provided for DomListener!');
        }

        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListeners() {
        if (!Array.isArray(this.listeners) || !this.listeners.length) {
            return;
        }

        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);

            // Method is not implemented
            if (!this[method]) {
                console.warn(`DEV Warn: Method ${ method } is not implemented in ${ this.name } Component`);

                return;
            }

            // Bind context in this way so that you can actually REMOVE event listener later
            this[method] = this[method].bind(this);

            // Same as addEventListener
            this.$root.on(listener, this[method]);
        });
    }

    removeDOMListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);

            // Same as addEventListener
            this.$root.off(listener, this[method]);
        });
    }
}
