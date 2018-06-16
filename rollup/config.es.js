import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    input: './src/index.js',
    plugins: [
        babel({
            babelrc: false,
            exclude: 'node_modules/**'
        }),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        cjs({
            include: 'node_modules/**',
            exclude: []
        }),
    ],
    output: {
        sourcemap: true,
        name: 'Aventador',
        format: 'es',
        file: './dist/aventador.js'
    }
};