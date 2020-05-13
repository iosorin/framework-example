import { ExcelComponent } from '@/core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root) {
        const name = 'Formula';
        const listeners = ['input'];

        super($root, {
            name,
            listeners
        });
    }

    onInput(evt) {
        console.log('Formula: onInput', evt.target.textContent, this.$root);
    }

    toHtml() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `;
    }
}
