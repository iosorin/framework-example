function getFormattedDate(tms) {
    tms = parseInt(tms);

    const dateISO = new Date(tms).toISOString();

    return dateISO.split('T')[0];
}

function toTableItem(key, index) {
    const [_, id] = key.split(':');
    const date = getFormattedDate(id);

    return `
        <li class="db__record">
            <a href="#excel/${ id }">Таблица номер ${ index + 1 }</a>
            <strong>${ date }</strong>
        </li>
    `;
}

// Получаем из LS записи по таблицам, соответсвующие паттеру [excel::12323]
function getKeys() {
    const keys = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (!key.includes('excel')) {
            continue;
        }

        keys.push(key);
    }

    return keys;
}

function createRecordsTable() {
    const keys = getKeys();

    if (!keys.length) {
        return '<h2 class="text-center">Таблиц нет</h2>';
    }

    const html =
    `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>

        <ul class="db__list">
            ${ keys.map(toTableItem).join('') }
        </ul>
    `;

    return html;
}

export {
    createRecordsTable
};
