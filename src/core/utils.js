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

export {
    capitalize,
    storage
};
