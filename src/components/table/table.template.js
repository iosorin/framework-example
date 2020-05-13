const CODES = {
    A: 65,
    Z: 90
};

function createCell(cel = '') {
    return `
        <div class="cell" contenteditable="">${ cel }</div>
    `;
}

function createColumn(col = '') {
    return `
        <div class="column">
            ${ col }
        </div>
    `;
}

function createRow({ int = '', content = '' } = { }) {
    return `
        <div class="row">
            <div class="row-info">${ int }</div>
            <div class="row-data">${ content }</div>
        </div>
    `;
}

function toChar(int) {
    return String.fromCharCode(CODES.A + int);
}

export function createTable(rowsCount = 30) {
    const colsCount = CODES.Z - CODES.A;

    let cols = [];
    let cells = [];

    const rows = [];

    for (let r = 0; r < rowsCount + 1; r++) {
        cols = [];
        cells = [];

        for (let c = 0; c <= colsCount; c++) {
            const char = toChar(c);

            const col = createColumn(char);
            const cell = createCell(); // String(char) + r

            cols.push(col);
            cells.push(cell);
        }

        cols = cols.join('');
        cells = cells.join('');

        const newCol = createRow({
            int: r,
            content: cells
        });

        rows.push(newCol);
    }

    // Create ABC-Layout and move it up
    rows.push(createRow({ content: cols }));
    rows.unshift(rows.pop());

    return rows.join('');
}
