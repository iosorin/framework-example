import { storage } from '@core/utils';

const defaultState = {
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
