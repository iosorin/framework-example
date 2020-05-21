// @core
import { Page } from '@core/Page';
import { createStore } from '@core/store/createStore';
import { storage, debounce } from '@core/utils';

// @store
import { rootReducer } from '@store/rootReducer';
import { normalizeInitialState } from '@store/initialState';

// Components
import { Excel } from '@/components/excel/Excel'; // root
import { Formula } from '@/components/formula/Formula';
import { Header } from '@/components/header/Header';
import { Table } from '@/components/table/Table';
import { Toolbar } from '@/components/toolbar/Toolbar';

function getStorageName(param) {
    return 'excel:' + param;
}
export class ExcelPage extends Page {
    getRoot() {
        const param = this.params || Date.now().toString();
        const storageName = getStorageName(param);

        // Create debounced store.state listener
        const state = storage(storageName);
        const store = createStore(rootReducer, normalizeInitialState(state));

        const stateListener = debounce((state) => {
            storage(storageName, state);
        }, 300);

        store.subscribe(stateListener);

        this.excel = new Excel({
            store,
            components: [Formula, Header, Table, Toolbar]
        });

        return this.excel.getRoot();
    }

    afterRender() {
        this.excel.init();
    }

    destroy() {
        this.excel.destroy();
    }
}
