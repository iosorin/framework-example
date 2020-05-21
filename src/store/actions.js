import { CHANGE_TITLE, TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLES } from './types';

export function changeTitle(title) {
    return {
        type: CHANGE_TITLE,
        data: title
    };
}

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

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data // styles
    };
}


export function applyStyles(data) {
    return {
        type: APPLY_STYLES,
        data // // value ids
    };
}
