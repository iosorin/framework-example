import { TABLE_RESIZE, CHANGE_TEXT, CHANGE_TITLE } from './types';

// Action Creator
export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    };
}


export function changeText(text) {
    return {
        type: CHANGE_TEXT,
        data: text
    };
}

export function changeTitle(title) {
    return {
        type: CHANGE_TITLE,
        data: title
    };
}
