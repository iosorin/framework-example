import './scss/index.scss';

// Components
import { Excel } from '@/components/excel/Excel'; // root
import { Formula } from '@/components/formula/Formula';
import { Header } from '@/components/header/Header';
import { Table } from '@/components/table/Table';
import { Toolbar } from '@/components/toolbar/Toolbar';

// @core
import { storage } from '@core/utils';
import { createStore } from '@core/createStore';

// @store
import { rootReducer } from '@store/rootReducer';
import { initialState } from '@store/initialState';

const store = createStore(rootReducer, initialState);

store.subscribe((state) => {
    storage('App-State', state);
});

const excelApp = new Excel('#app', {
    store,
    components: [Formula, Header, Table, Toolbar]
});

excelApp.render();
