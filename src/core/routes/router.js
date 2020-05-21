import { $ } from '@core/dom';
import { ActiveRoute } from './ActiveRoute';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Router selector is required');
        }

        this.$placeholder = $(selector);
        this.routes = routes;

        this.init();
    }

    init() {
        this.bindEvents();
        this.changePage();
    }

    bindEvents() {
        this.changePage = this.changePage.bind(this);

        window.addEventListener('hashchange', this.changePage);
    }

    changePage(event) {
        this.$placeholder.html(`<h1>${ActiveRoute.path}</h1>`);
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePage);
    }
}
