import { storage } from '@core/utils';
import { defaultStyles } from '../constants';

const defaultState = {
    title: 'Новая Таблица',
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles
};

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''

});

const storageState = storage('App-State');
const initialState = storageState ? storageState : normalize;

export {
    initialState
};
