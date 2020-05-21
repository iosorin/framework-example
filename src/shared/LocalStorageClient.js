import { storage } from '@core/utils';

function storageName(param) {
    return 'excel:' + param;
}

export class LocalStorageClient {
    constructor(name) {
        this.name = storageName(name);
    }

    save(state) {
        storage(this.name, state);

        return Promise.resolve();
    }

    get() {
        return new Promise((resolve) => {
            const state = storage(this.name);

            // Emulate waiting for a server response
            setTimeout(() => {
                resolve(state);
            }, 1200);
        });
    }
}
