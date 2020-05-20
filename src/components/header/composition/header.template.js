export function create(title) {
    return `
        <input type="text" class="input" value="${ title }" data-title="${ title }"/>

        <div>
            <div class="button">
                <i class="material-icons">delete</i>
            </div>

            <div class="button">
                <i class="material-icons">exit_to_app</i>
            </div>
        </div>
    `;
}
