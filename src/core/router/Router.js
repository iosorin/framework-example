import { $ } from '../dom';
import { ActiveRoute } from './ActiveRoute';
import { Loader } from '../../components/loader/loader';

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Router selector is required');
        }

        this.$placeholder = $(selector);
        this.$loader = new Loader();

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

    async changePage(page = null) {
        if (this.page) {
            this.page.destroy();
        }

        this.$placeholder.clear();
        this.$placeholder.append(this.$loader);

        let Page = ActiveRoute.path.includes('excel') ?
            this.routes.excel :
            this.routes.dashboard;

        if (page && this.routes[page]) {
            Page = this.routes[page];
        }

        this.page = new Page(ActiveRoute.param);

        const root = await this.page.getRoot();

        this.$placeholder.clear();
        this.$placeholder.append(root);

        this.page.afterRender();
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePage);
    }
}
