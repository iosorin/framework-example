import { create } from './composition/table.template';
import { resize } from './composition/table.resize';
import { shouldResize } from './composition/table.utils';

import { ExcelComponent } from '@core/ExcelComponent';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        const name = 'Table';
        const listeners = ['mousedown'];

        super($root, {
            name,
            listeners
        });

        this.canResize = true;
    }

    toHtml() {
        return create(20);
    }

    onMousedown(e) {
        if (shouldResize(e)) {
            resize(this.$root, e);
        }
    }
}
