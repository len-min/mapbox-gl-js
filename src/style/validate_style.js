// @flow
import validateStyle from '../style-spec/validate_style.min';
export default validateStyle;

import type Evented from '../util/evented';

export function emitValidationErrors(emitter: Evented, errors: ?Array<{message: string}>) {
    if (errors && errors.length) {
        for (const {message} of errors) {
            emitter.fire('error', { error: new Error(message) });
        }
        return true;
    } else {
        return false;
    }
};
