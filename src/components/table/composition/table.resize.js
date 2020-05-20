import { $ } from '@core/dom';

export const resize = ($root, e) => {
    return new Promise((resolve) => {
        let value;

        const $resizer = $(e.target);

        const $parent = $resizer.closest('[data-type="resizable"]');
        const coords = $parent.coords();

        const type = $resizer.data.resize;
        const isCol = type === 'col';
        const rProp = isCol ? 'bottom' : 'right';

        $resizer.css({ [rProp]: '-5000px' });

        document.onmousemove = (e) => {
            $root.toggleClass('on-resize', true);

            if (isCol) {
                const delta = e.pageX - coords.right;
                value = coords.width + delta;

                $resizer.css({ right: -delta + 'px' });
            }
            else {
                const delta = e.pageY - coords.bottom;
                value = coords.height + delta;

                $resizer.css({ bottom: -delta + 'px' });
            }
        };

        document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;

            $resizer.css({ right: 0, bottom: 0 });

            if (isCol) {
                const $cells = $root.findAll(`[data-col="${ $parent.data.col }"]`);
                $cells.forEach($cell => $cell.css({ width: value + 'px' }));
            }
            else {
                $parent.css({ height: value + 'px' });
            }

            resolve({
                id: $parent.data[type],
                value,
                type
            });
        };
    });
};
