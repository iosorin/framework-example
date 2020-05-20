import { $ } from '@core/dom';
import { ExcelComponent } from '@core/ExcelComponent';

import { utils } from './composition/table.utils';
import { create } from './composition/table.template';
import { resize } from './composition/table.resize';

import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        const name = 'Table';
        const listeners = ['mousedown', 'keydown', 'input'];

        super($root, {
            name,
            listeners,
            ...options
        });
    }

    onBeforeInit() {
        this.selection = new TableSelection(this.$root);
    }

    init() {
        super.init();

        this.listenEvents();
        this.selectCell(this.$root.find('.cell[data-id="0:0"]'));
    }


    listenEvents() {
        this.$on('formula:input', (data) => {
            this.selection.current.text(data);
        });

        this.$on('formula:done', () => {
            this.selection.current.focus();
        });
    }

    selectCell($el) {
        this.selection.select($el);

        this.$emit('table:select', $el.text());
    }

    onMousedown(e) {
        if (utils.shouldResize(e)) {
            resize(this.$root, e);
        }
        else if (utils.isCell(e)) {
            const $target = $(e.target);

            if (e.shiftKey) {
                const ids = utils.matrix($target, this.selection.current);
                const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`));

                this.selection.selectGroup($cells);
            }
            else {
                this.selection.select($target);
            }
        }
    }

    onKeydown(e) {
        const keys = [
            'Tab',
            'Enter',
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight'
        ];

        const navigate = keys.includes(e.key) && !e.shiftKey;

        if (navigate) {
            e.preventDefault();

            const current = this.selection.current.id(true);
            const newId = utils.nextSelector(e.key, current);

            const $next = this.$root.find(newId);

            this.selectCell($next);
        }
    }

    onInput(e) {
        this.$emit('table:input', $(e.target).text());
    }

    toHtml() {
        return create(20);
    }
}
