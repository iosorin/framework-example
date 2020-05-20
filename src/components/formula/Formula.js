import { $ } from '@core/dom';
import { ExcelComponent } from '@/core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        const name = 'Formula';
        const listeners = ['input', 'keydown'];

        super($root, {
            name,
            listeners,
            ...options
        });

        this.init();
    }

    init() {
        super.init();

        this.$formula = this.$root.find('#formula');

        this.subscribe();
    }

    subscribe() {
        this.$on('table:select', (text) => {
            this.$formula.text(text);
        });

        this.$on('table:input', (text) => {
            this.$formula.text(text);
        });

        // this.$subscribe((state) => {
        //     console.log('FORMULA UPDATE', state.currentText);
        //     this.$formula.text(state.currentText);
        // });
    }

    onInput(e) {
        this.$emit('formula:input', $(e.target).text());
    }

    onKeydown(e) {
        const keys = ['Enter', 'Tab'];

        if (keys.includes(e.key)) {
            e.preventDefault();

            this.$emit('formula:done');
        }
    }

    toHtml() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false" id="formula"></div>
        `;
    }
}
