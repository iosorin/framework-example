import { $ } from '../../core/dom';

// Функциональные компоненты - тоже окей
export function Loader() {
    return $.create('div', 'excel__loader').html(`
        <div class="lds-ripple">
            <div></div>
            <div></div>
        </div>
    `);
}
