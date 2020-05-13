export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);

        this.components = options.components || [];
    }

    getRoot() {
        const $root = document.createElement('div');

        this.components.forEach((Component) => {
            const component = new Component();
            const html = component.toHtml();

            $root.insertAdjacentHTML('beforeend', html);
        });

        return $root;
    }

    render() {
        this.$el.append(this.getRoot());
    }
}
