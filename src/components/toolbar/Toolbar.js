import { $ } from '@core/dom';

import { create } from './composition/toolbar.template';
import { ExcelStateComponent } from '@/core/ExcelStateComponent';
import { defaultStyles } from '@/constants';

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        const name = 'Toolbar';
        const listeners = ['click'];
        const storeSubscribes = ['currentStyles'];

        super($root, {
            name,
            listeners,
            storeSubscribes,
            ...options
        });
    }

    get template() {
        return create(this.state);
    }

    onBeforeInit() {
        this.initState(defaultStyles);
    }

    storeChanged(data) {
        this.setState(data.currentStyles);
    }

    onClick(e) {
        const $target = $(e.target);

        if ($target.data.value) {
            const style = JSON.parse($target.data.value);

            this.$emit('toolbar:applyStyle', style);
        }
    }

    toHtml() {
        return this.template;
    }
}
