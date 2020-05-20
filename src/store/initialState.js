import { storage } from '@core/utils';

const defaultState = {
    title: 'Новая Таблица',
    rowState: {},
    colState: {},
    dataState: {},
    currentText: ''
};

const storageState = storage('App-State');
const initialState = storageState ? storageState : defaultState;

export {
    initialState
};
