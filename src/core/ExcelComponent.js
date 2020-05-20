import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);

        this.name = options.name || '';

        this.$store = options.store;
        this.storeSubscribe = [];

        this.emmiter = options.emmiter;
        this.unsubscribers = [];

        this.onBeforeInit();
    }

    // Возвращает шаблон компонента
    toHtml() {
        return '';
    }

    // EVENTS ========================================
    // Notify listeners about event "event"
    $emit(event, ...args) {
        this.emmiter.emit(event, ...args);
    }

    // Subsribe on event "event"
    $on(event, callback) {
        const unsubscribe = this.emmiter.on(event, callback);

        this.unsubscribers.push(unsubscribe);
    }

    // STORE ========================================
    $dispatch(action) {
        this.$store.dispatch(action);
    }

    $subscribe(callback) {
        this.storeSubscribe = this.$store.subscribe(callback);
    }

    // Lifecycle hook
    onBeforeInit() { }


    // Lifecycle hook - init dom listeners
    init() {
        this.initDOMListeners();
    }

    // Lifecycle hook - remove dom listeners
    destroy() {
        this.removeDOMListeners();

        // Events off
        this.unsubscribers.forEach(unsub => unsub());
        this.storeSubscribe.unsubscribe();
    }
}
