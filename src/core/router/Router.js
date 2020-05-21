import { $ } from '../dom';
import { ActiveRoute } from './ActiveRoute';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Router selector is required');
        }

        this.$placeholder = $(selector);
        this.routes = routes;

        this.page = null;

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

    changePage(page = null) {
        if (this.page) {
            this.page.destroy();
        }

        this.$placeholder.clear();

        let Page = ActiveRoute.path.includes('excel') ?
            this.routes.excel :
            this.routes.dashboard;

        if (page && this.routes[page]) {
            Page = this.routes[page];
        }

        this.page = new Page(ActiveRoute.param);

        this.$placeholder.append(this.page.getRoot());

        this.page.afterRender();
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePage);
    }
}
