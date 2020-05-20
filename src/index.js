import './scss/index.scss';

import { Excel } from '@/components/excel/Excel';

import { Formula } from '@/components/formula/Formula';
import { Header } from '@/components/header/Header';
import { Table } from '@/components/table/Table';
import { Toolbar } from '@/components/toolbar/Toolbar';

import { createStore } from '@core/createStore';
import { rootReducer } from '@store/rootReducer';

const store = createStore(rootReducer, {
});

const excelApp = new Excel('#app', {
    store,
    components: [Formula, Header, Table, Toolbar]
});

excelApp.render();
