const shouldResize = (e) => {
    return e.target?.dataset.resize;
};

const isCell = (e) => {
    return e.target.dataset.type === 'cell';
};

const range = (start, end) => {
    if (start > end) {
        [start, end] = [end, start];
    }

    const length = end - start + 1;

    return new Array(length)
        .fill('')
        .map((_, index) => {
            return parseInt(start) + index;
        });
};

const matrix = ($target, $current) => {
    const target = $target.id(true);
    const current = $current.id(true);

    const cols = range(current.col, target.col);
    const rows = range(current.row, target.row);

    return cols .reduce((elements, col) => {
        rows.forEach(row => elements.push(`${row}:${col}`));
        return elements;
    }, []);
};

const nextSelector = (key, { col, row }) => {
    const min = 0;

    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++;
            break;
        case 'ArrowUp':
            row = (row - 1 < min) ? min : row - 1;
            break;
        case 'Tab':
        case 'ArrowRight':
            col++;
            break;
        case 'ArrowLeft':
            col = (col - 1 < min) ? min : col - 1;
            break;
    }

    return `[data-id="${row}:${col}"]`;
};


export const utils = {
    shouldResize,
    isCell,
    matrix,
    nextSelector
};
