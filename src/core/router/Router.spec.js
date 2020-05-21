import { Page } from '../page/Page';
import { Router } from './Router';

const createDiv = (innerText = '') => {
    const root = document.createElement('div');
    root.innerHTML = innerText;
    return root;
};

class DashboardPage extends Page {
    getRoot() {
        return createDiv('Dashboard');
    }
}

class ExcelPage extends Page {
    getRoot() {
        return createDiv('Excel');
    }
}

describe('Router', () => {
    let router;
    let $root;

    beforeEach(() => {
        $root = createDiv('Root');

        router = new Router($root, {
            dashboard: DashboardPage,
            excel: ExcelPage
        });
    });

    test('should be defined', () => {
        expect(router).toBeDefined();
    });

    test('should render Dashboard page', () => {
        router.changePage();

        expect($root.innerHTML).toBe('<div>Dashboard</div>');
    });

    test('should render Excel page after calling changePage method with an a argument', () => {
        router.changePage('excel');

        expect($root.innerHTML).toBe('<div>Excel</div>');
    });
});
