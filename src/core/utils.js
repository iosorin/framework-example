// Pure functions - не взаимодействуют с глобальном скопом, реагируют только на входящие параметры
const capitalize = (str) => {
    if (typeof str !== 'string' || !str.split().length) {
        return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
};

function storage(key, data = null) {
    // set
    if (data) {
        localStorage.setItem(key, JSON.stringify(data));

        return;
    }

    // get
    return JSON.parse(localStorage.getItem(key));
}

function isEqual(a, b) {
    if (typeof a === 'object' && b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    return a === b;
}

function camelToDashCase(str) {
    return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
}

function toInlineStyles(styles = {}) {
    if (styles) {
        return Object.keys(styles)
            .map(key => `${ camelToDashCase(key) }: ${ styles[key] }`)
            .join(';');
    }

    return styles;
}

function debounce(fn, wait) {
    let timeout;

    return function(...args) {
        const later = () => {
            clearTimeout(timeout);

            // eslint-disable-next-line no-invalid-this
            fn.apply(this, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export {
    debounce,
    capitalize,
    storage,
    isEqual,
    toInlineStyles
};
