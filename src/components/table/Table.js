import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from '@/components/table/composition/table.template';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        const name = 'Table';
        const listeners = ['click', 'mousemove', 'mousedown', 'mouseup'];

        super($root, {
            name,
            listeners
        });

        this.canResize = false;
    }

    toHtml() {
        return createTable(20);
    }

    onClick() {
    }

    onMousemove(e) {
        if (!this.canResize) {
            return;
        }

        const { target } = e;

        console.log('resize', target.dataset?.resize);
    }

    onMousedown(e) {
        this.canResize = true;
    }

    onMouseup() {
        this.canResize = false;
    }
}
