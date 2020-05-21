import { $ } from '@core/dom';

import { ExcelComponent } from '@core/ExcelComponent';
import { TableSelection } from './TableSelection';

import { utils } from './composition/table.utils';
import { create } from './composition/table.template';
import { resize } from './composition/table.resize';

import * as actions from '@store/actions';
import { defaultStyles } from '@/constants';

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

        this.$on('formula:input', (text) => {
            this.selection.current.text(text); // visual update
            this.updateTextInStore(text); // store update
        });

        this.$on('formula:done', () => {
            this.selection.current.focus();
        });

        this.$on('toolbar:applyStyle', (value) => {
            const { ids } = this.selection;

            this.selection.applyStyle(value);

            this.$dispatch(actions.applyStyles({
                value,
                ids
            }));
        });

        this.selectCell(this.$root.find('.cell[data-id="0:0"]'));
    }

    selectCell($cell) {
        this.selection.select($cell);

        this.$emit('table:select', $cell.text());

        const styles = $cell.getStyle(Object.keys(defaultStyles), defaultStyles);

        this.$dispatch(actions.changeStyles(styles));
    }


    async resizeTable(event) {
        try {
            const data = await resize(this.$root, event);

            this.$dispatch(actions.tableResize(data));
        }
        catch (e) {
            console.warn('Resize error', e.message);
        }
    }

    updateTextInStore(value) {
        this.$dispatch(
            actions.changeText({
                id: this.selection.current.id(),
                value
            })
        );
    }

    onMousedown(e) {
        if (utils.shouldResize(e)) {
            this.resizeTable(e);
        }
        else if (utils.isCell(e)) {
            const $target = $(e.target);

            if (e.shiftKey) {
                const ids = utils.matrix($target, this.selection.current);
                const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`));

                this.selection.selectGroup($cells);
            }
            else {
                this.selectCell($target);
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
        const text = $(e.target).text();
        this.updateTextInStore(text);
    }

    toHtml() {
        const state = this.$store.getState();

        return create(20, state);
    }
}
