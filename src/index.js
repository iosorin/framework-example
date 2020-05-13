import './scss/index.scss';

import { Excel } from '@/components/excel/Excel';

import { Formula } from '@/components/formula/Formula';
import { Header } from '@/components/header/Header';
import { Table } from '@/components/table/Table';
import { Toolbar } from '@/components/toolbar/Toolbar';

const excelApp = new Excel('#app', {
    components: [Formula, Header, Table, Toolbar]
});

excelApp.render();
