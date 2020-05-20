function toButton(button) {
    return `
        <div
            class="button ${ button.active ? 'active' : '' }"
            data-value='${ JSON.stringify(button.value) }'
        >
            <i class="material-icons">${ button.icon }</i>
        </div>
    `;
}

export function create(state) {
    const isLeft = state.textAlign === 'left';
    const isCenter = state.textAlign === 'center';
    const isRight = state.textAlign === 'right';

    const isBold = state.fontWeight === 'bold';
    const isItalic = state.fontStyle === 'italic';
    const isUnderline = state.textDecoration === 'underline';

    const buttons = [
        {
            icon: 'format_align_left',
            active: isLeft,
            value: {
                textAlign: 'left'
            }
        },
        {
            icon: 'format_align_center',
            active: isCenter,
            value: {
                textAlign: 'center'
            }
        },
        {
            icon: 'format_align_right',
            active: isRight,
            value: {
                textAlign: 'right'
            }
        },
        {
            icon: 'format_bold',
            active: isBold,
            value: {
                fontWeight: isBold ? 'normal' : 'bold'
            }
        },
        {
            icon: 'format_italic',
            active: isItalic,
            value: {
                fontStyle: isItalic ? 'normal' : 'italic'
            }
        },
        {
            icon: 'format_underlined',
            active: isUnderline,
            value: {
                textDecoration: isUnderline ? 'none' : 'underline'
            }
        }
    ];

    return buttons.map(toButton).join('');
}
