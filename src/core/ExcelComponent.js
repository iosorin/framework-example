import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);

        this.name = options.name || '';

        this.$store = options.store;
        this.storeSubscribes = options.storeSubscribes || [];

        this.emmiter = options.emmiter;
        this.unsubscribers = [];

        this.onBeforeInit();
    }

    // EMIT-EVENTS ========================================
    $emit(event, ...args) {
        // Notify listeners about event "event"
        this.emmiter.emit(event, ...args);
    }

    $on(event, callback) {
        const unsubscribe = this.emmiter.on(event, callback);

        // Subsribe on event "event"
        this.unsubscribers.push(unsubscribe);
    }

    // STORE ========================================
    $dispatch(action) {
        this.$store.dispatch(action);
    }

    // Pass only watched properties changes
    storeChanged() {
    }

    isWatching(key) {
        return this.storeSubscribes.includes(key);
    }

    // LIFECYCLES ========================================
    onBeforeInit() { }


    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();

        // Events off
        this.unsubscribers.forEach(unsub => unsub());
    }

    // Component Template
    toHtml() {
        return '';
    }
}
