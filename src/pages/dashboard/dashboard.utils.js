import { storage } from '@core/utils';


function toHtml(key, index) {
    const model = storage(key);

    const id = key.split(':')[1];
    const date = new Date(model.updateDate);

    return `
        <li class="db__record">
            <a href="#excel/${ id }">${ model.title }</a>

            <strong>
                ${ date.toLocaleDateString() }
                (${ date.toLocaleTimeString() })
            </strong>
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
            ${ keys.map(toHtml).join('') }
        </ul>
    `;

    return html;
}

export {
    createRecordsTable
};
