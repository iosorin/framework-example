import {
    CHANGE_TITLE,
    TABLE_RESIZE,
    CHANGE_TEXT,
    CHANGE_STYLES,
    APPLY_STYLES,
    UPDATE_DATE
} from './types';

function changeTitle(title) {
    return {
        type: CHANGE_TITLE,
        data: title
    };
}

function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    };
}

function changeText(text) {
    return {
        type: CHANGE_TEXT,
        data: text
    };
}

function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data // styles
    };
}


function applyStyles(data) {
    return {
        type: APPLY_STYLES,
        data // // value ids
    };
}

function updateDate() {
    return {
        type: UPDATE_DATE
    };
}

export {
    changeTitle,
    tableResize,
    changeText,
    changeStyles,
    applyStyles,
    updateDate
};
