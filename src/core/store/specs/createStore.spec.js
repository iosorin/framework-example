import { createStore } from '../createStore';

describe('Create Store Test', () => {
    test('test ', () => {
        const store = createStore(() => {}, {});

        expect(store).toBeDefined();
    });
});
