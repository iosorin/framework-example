/* eslint-disable no-case-declarations */
import {
    CHANGE_TITLE,
    TABLE_RESIZE,
    CHANGE_TEXT,
    CHANGE_STYLES,
    APPLY_STYLES
} from './types';


// Pure Function - сохранение в localStorage будет side-эффектом
export function rootReducer(state, action) {
    let field;

    switch (action.type) {
        case CHANGE_TITLE:
            return {
                ...state,
                title: action.data
            };

        case TABLE_RESIZE:
            field = (action.data.type === 'col') ? 'colState' : 'rowState';

            return {
                ...state,
                [field]: value(state, field, action)
            };

        case CHANGE_TEXT:
            field = 'dataState';

            return {
                ...state,
                currentText: action.data.value,
                [field]: value(state, field, action)
            };

        case CHANGE_STYLES:
            return {
                ...state,
                currentStyles: action.data
            };

        case APPLY_STYLES:
            field = 'stylesState';

            const val = state[field] || {};
            const { ids } = action.data;

            ids.forEach((id) => {
                val[id] = { ...val[id], ...action.data.value };
            });

            return {
                ...state,
                currentStyles: { ...state.currentStyles, ...action.data.value },
                [field]: val
            };


        default:
            return { ...state };
    }
}


function value(state, field, action) {
    const val = state[field] || {};

    val[action.data.id] = action.data.value;

    return val;
}
