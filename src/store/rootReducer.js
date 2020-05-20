/* eslint-disable no-case-declarations */

// Pure Function - сохранение в localStorage будет side-эффектом
export function rootReducer(state, action) {
    let prevState;
    let field;

    switch (action.type) {
        case 'TABLE_RESIZE':
            field = action.data.type === 'col' ? 'colState' : 'rowState';

            prevState = state[field] || {};
            prevState[action.data.id] = action.data.value;

            return { ...state, [field]: prevState }; // id, value

        default:
            return { ...state };
    }
}
