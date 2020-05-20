const CODES = {
    A: 65,
    Z: 90
};

const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 24;

function getData(state, id) {
    return state[id] || '';
}

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function toCell(state, row) {
    return function(_, col) {
        const width = getWidth(state.colState, col);
        const data = getData(state.dataState, `${row}:${col}`);

        return `
            <div
                class="cell"
                contenteditable
                data-col="${ col }"
                data-id="${ row }:${ col }"
                data-type="cell"
                style="width: ${ width }"
            >
                ${ data }
            </div>
        `;
    };
}

function toColumn({ col, index, width } = {}) {
    return `
        <div
            class="column"
            data-type="resizable"
            data-col="${ index }"
            style="width: ${ width }"
        >
            ${ col }
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function createRow(index, content, state) {
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
    const height = getHeight(state, index);

    return `
        <div
            class="row"
            data-row="${ index }"
            data-type="resizable"
            style="height: ${ height }"
        >
            <div class="row-info">
                ${ index || ''}
                ${ resize }
            </div>
            <div class="row-data">${ content }</div>
        </div>
    `;
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function withWidth(colState) {
    return function(col, index) {
        const width = getWidth(colState, index);

        return {
            col,
            index,
            width
        };
    };
}

export function create(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidth(state.colState))
        .map(toColumn)
        .join('');

    rows.push(createRow(null, cols, {}));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell(state, row))
            .join('');

        rows.push(createRow(row + 1, cells, state.rowState));
    }

    return rows.join('');
}
