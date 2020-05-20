import { $ } from '@core/dom';

import { create } from './composition/toolbar.template';
import { ExcelStateComponent } from '@/core/ExcelStateComponent';
import { defaultStyles } from '@/constants';

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        const name = 'Toolbar';
        const listeners = ['click'];

        super($root, {
            name,
            listeners,
            ...options
        });
    }

    get template() {
        return create(this.state);
    }

    toHtml() {
        return this.template;
    }

    onBeforeInit() {
        this.initState(defaultStyles);
    }

    onClick(e) {
        const $target = $(e.target);

        if ($target.data.value) {
            const style = JSON.parse($target.data.value);

            const key = Object.keys(style)[0];
            const value = style[key];

            this.$emit('toolbar:applyStyle', { key, value });

            this.setState({ [key]: value });
        }
    }
}
