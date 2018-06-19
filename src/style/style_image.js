// @flow

import type {RGBAImage} from '../util/image';

export type StyleImage = {
    data: RGBAImage,
    pixelRatio: number,
    sdf: boolean,
    anchor_x: number,
    anchor_y: number
};
