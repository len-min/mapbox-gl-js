import flow from 'rollup-plugin-flow';
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import unassert from 'rollup-plugin-unassert';
import json from 'rollup-plugin-json';
import browserifyPlugin from 'rollup-plugin-browserify-transform';
import brfs from 'brfs';

export default [
    {
        input: 'src/index.js',
        output: {
            name: 'mapboxgl',
            file: 'dist/mapboxgl-rollup.js',
            format: 'umd'
        },
        plugins: [
            flow(),
            json(),
            buble({transforms: {dangerousForOf: true}, objectAssign: "Object.assign"}),
            unassert(),
            resolve({
                browser: true,
                preferBuiltins: false
            }),
            browserifyPlugin(brfs, {
                include: 'src/shaders/index.js'
            }),
            commonjs({
                namedExports: {
                    '@mapbox/gl-matrix': ['vec3', 'vec4', 'mat2', 'mat3', 'mat4']
                }
            })
        ]
    }
]
