export function parse(value = '') {
    if (value.startsWith('=')) {
        try {
            return eval(value.replace('=', ''));
        }
        catch {
            return value;
        }
    }

    return value;
}
