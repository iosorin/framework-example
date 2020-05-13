class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector;
    }

    html(html) {
        // setter
        if (typeof html === 'string') {
            this.$el.innerHTML = html;

            // Return instance to continue chain
            return this;
        }

        // getter
        return this.$el.outerHTML.trim();
    }

    clear() {
        this.html('');

        return this;
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }

        // Polyfill
        if (Element.prototype.append) {
            this.$el.append(node);
        }
        else {
            this.$el.appendChild(node);
        }

        return this;
    }

    on() {

    }
}


export function $(selector) {
    return new Dom(selector);
}


$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);

    if (classes) {
        el.classList.add(classes);
    }

    return $(el);
};
