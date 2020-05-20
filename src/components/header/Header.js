import { $ } from '@core/dom';

import { ExcelComponent } from '@/core/ExcelComponent';
import { create } from './composition/header.template';

import * as actions from '@store/actions';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        const name = 'Header';
        const listeners = ['input'];

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


    toHtml() {
        const state = this.$store.getState();

        return create(state.title);
    }
}
