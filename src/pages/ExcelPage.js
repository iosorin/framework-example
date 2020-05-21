// @core
import { Page } from '@core/page/Page';
import { StateProcessor } from '@core/page/StateProcessor';
import { createStore } from '@core/store/createStore';

// @store
import { rootReducer } from '@store/rootReducer';
import { normalizeInitialState } from '@store/initialState';

// client
import { LocalStorageClient } from '@/shared/LocalStorageClient';

// Components
import { Excel } from '@/components/excel/Excel'; // root
import { Formula } from '@/components/formula/Formula';
import { Header } from '@/components/header/Header';
import { Table } from '@/components/table/Table';
import { Toolbar } from '@/components/toolbar/Toolbar';


export class ExcelPage extends Page {
    constructor(param) {
        super(param);

        this.storeSub = null;

        const client = new LocalStorageClient(this.params);
        this.processor = new StateProcessor(client);
    }

    async getRoot() {
        const state = await this.processor.get();
        const initialState = normalizeInitialState(state);
        const store = createStore(rootReducer, initialState);

        this.storeSub = store.subscribe(this.processor.listen);

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
        this.storeSub.unsubscribe();
    }
}
