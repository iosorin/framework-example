import { clone } from '@core/utils';
import { defaultStyles, defaultTitle } from '../constants';

const defaultState = {
    title: defaultTitle,
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

const normalizeInitialState = (state) => {
    return state ? normalize(state) : clone(defaultState);
};

export {
    normalizeInitialState
};
