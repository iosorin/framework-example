export class Observer {
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

// Example
// const observer = new Observer();

// // Return ubsubscribe callback
// const unsubscribe = observer.on('my-event', data => console.log(data));

// setTimeout(() => {
//     observer.emit('my-event', 'after 1 second');
// }, 1000);

// setTimeout(() => {
//     observer.emit('my-event', 'after 2 second');

//     unsubscribe();
// }, 2000);

// setTimeout(() => {
//     observer.emit('my-event', 'after 3 second');
// }, 3000);
