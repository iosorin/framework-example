import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);

        this.name = options.name || '';

        this.emmiter = options.emmiter;
        this.unsubscribers = [];

        this.onBeforeInit();
    }

    // Возвращает шаблон компонента
    toHtml() {
        return '';
    }

    // Notify listeners about event "event"
    $emit(event, ...args) {
        this.emmiter.emit(event, ...args);
    }

    // Subsribe on event "event"
    $on(event, callback) {
        const unsubscribe = this.emmiter.on(event, callback);

        this.unsubscribers.push(unsubscribe);
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
    }
}
