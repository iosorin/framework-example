import './scss/index.scss';
import { Router } from '@core/routes/Router';

new Router('#app', {

});
// // Components
// import { Excel } from '@/components/excel/Excel'; // root
// import { Formula } from '@/components/formula/Formula';
// import { Header } from '@/components/header/Header';
// import { Table } from '@/components/table/Table';
// import { Toolbar } from '@/components/toolbar/Toolbar';

// // @core
// import { createStore } from '@core/createStore';
// import { storage, debounce } from '@core/utils';

// // @store
// import { rootReducer } from '@store/rootReducer';
// import { initialState } from '@store/initialState';


// // Create debounced store.state listener
// const store = createStore(rootReducer, initialState);

// const stateListener = debounce((state) => {
//     storage('App-State', state);
// }, 300);

// store.subscribe(stateListener);

// const excelApp = new Excel('#app', {
//     store,
//     components: [Formula, Header, Table, Toolbar]
// });

// excelApp.render();
