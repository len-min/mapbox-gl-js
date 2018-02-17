import assert from 'assert';
import MagicString from 'magic-string';

export default function workerPrelude () {
    return {
        name: 'mapbox-gl-worker-prelude',
        transformBundle: (source, {format}) => {
            assert(format === 'umd');

            const preludeString = 'function (global, factory) {\n';

            const s = new MagicString(source);
            s.appendRight(source.indexOf(preludeString) + preludeString.length, `
    /* begin worker prelude */
    const isWebWorker = (function () { try { return self instanceof WorkerGlobalScope; } catch(e) { return false; } })();
    if (!isWebWorker) {
        const _factory = factory;
        factory = function () {
            const bundleString = \`const mbgl = (\${_factory})();
                mbgl._createWorker(self);\`;
            const mbgl = _factory();
            mbgl.workerUrl = window.URL.createObjectURL(
                new Blob([bundleString], { type: 'text/javascript' })
            );
            return mbgl;
        }
    }
    /* end worker prelude */
`);

            return {
                code: s.toString(),
                map: s.generateMap()
            };
        }
    };
}
