export class Emmiter {
    constructor() {
        this.listeners = {};
    }

    // dispatch, emit, trigger, fire
    emit(event, ...args) {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].forEach((listener) => {
                listener(...args);
            });

            return true;
        }

        return false;
    }

    // listen, subscribe
    on(event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(callback);

        return () => {
            this.listeners[event] = this.listeners[event]
                .filter(listener => listener !== callback);
        };
    }
}
