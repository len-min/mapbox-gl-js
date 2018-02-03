export default require('../style-spec/validate_style.min');

import type Evented from '../util/evented';

export const emitErrors = function (emitter: Evented, errors: ?Array<{message: string}>) {
    if (errors && errors.length) {
        for (const {message} of errors) {
            emitter.fire('error', { error: new Error(message) });
        }
        return true;
    } else {
        return false;
    }
};
