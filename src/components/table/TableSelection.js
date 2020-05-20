export class TableSelection {
    static selectedClass = 'selected';

    constructor() {
        this.group = [];
        this.current = null;
    }

    clear() {
        this.group.forEach($el => $el.toggleClass(TableSelection.selectedClass, false));
        this.group = [];
    }

    select($el) {
        this.clear();

        $el.focus().toggleClass(TableSelection.selectedClass, true);

        this.group.push($el);
        this.current = $el;
    }

    selectGroup(group = []) {
        this.clear();

        this.group = group;

        this.group.forEach($el => $el.toggleClass(TableSelection.selectedClass, true));
    }

    applyStyle({ key, value } = {}) {
        this.group.forEach($el => $el.css({ [key]: value }));
    }
}
