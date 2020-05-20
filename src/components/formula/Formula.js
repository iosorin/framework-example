import { ExcelComponent } from '@/core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        const name = 'Formula';
        const listeners = ['input'];

        super($root, {
            name,
            listeners,
            ...options
        });
    }

    onInput(evt) {
        const text = evt.target.textContent.trim();
        this.observer.emit('observer-test', text);
    }

    toHtml() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `;
    }
}
