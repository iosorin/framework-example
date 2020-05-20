// Тоже observer
// Функциональный подход из-за замыкания и приватных переменных в верхнем скоупе
export function createStore(rootReducer, initialState = {}) {
    // через редьюсер, потому что именно он, в принципе, должен возвращать state и Клонируем, чтобы избежать мутаций
    // формат программных actions (init)
    let state = rootReducer({ ...initialState }, { type: '__INIT__' });
    let listeners = [];

    return {
        /**
         * @param {Function} callback
         *
         * @return {Function} - unsubscribe
         */
        subscribe(callback) {
            listeners.push(callback);

            return {
                unsubscribe() {
                    listeners = listeners.filter(l => l !== callback);
                }
            };
        },

        /**
         * @param {Object} action
         */
        dispatch(action) {
            state = rootReducer(state, action);
            listeners.forEach(listener => listener(state));
        },

        getState() {
            return state;
        }
    };
}


// Extra task - переписать на класс
