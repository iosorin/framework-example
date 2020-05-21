import { $ } from '@core/dom';
import { ExcelComponent } from '@/core/ExcelComponent';
import { ActiveRoute } from '@core/router/ActiveRoute';

import * as actions from '@store/actions';

import { create } from './composition/header.template';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        const name = 'Header';
        const listeners = ['input', 'click'];

        super($root, {
            name,
            listeners,
            ...options
        });
    }

    onInput(e) {
        const $target = $(e.target);

        if ($target.data.title) {
            const newTitle = $target.text();

            this.$dispatch(actions.changeTitle(newTitle));
        }
    }

    onClick(e) {
        const $target = $(e.target);
        const { action } = $target.data;

        if (action === 'delete') {
            const decision = confirm('Вы действительно хотите удалить эту таблицу?');

            if (decision) {
                localStorage.removeItem('excel:' + ActiveRoute.param);
                ActiveRoute.navigate('');
            }
        }
        else if (action === 'exit') {
            ActiveRoute.navigate('');
        }
    }

    toHtml() {
        const state = this.$store.getState();

        return create(state.title);
    }
}
