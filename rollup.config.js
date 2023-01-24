import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const plugins = [
    resolve({
        browser: true,
    }),
    typescript({ tsconfig: './tsconfig.json' }),
];

const commonConfig = {
    plugins: [
        resolve(),
        commonjs({
            include: /node_modules/,
            requireReturnsDefault: 'auto', // <---- this solves default issue
        }),
        typescript({
            tsconfig: './tsconfig.json',
            sourceRoot: '/src',
        }),
    ],
};

async function getConfig() {
    return [
        {
            input: 'src/screenshot.ts',
            output: [
                {
                    file: 'dist/screenshot-ftw.mjs',
                    format: 'esm',
                    sourcemap: true,
                },
            ],
            plugins,
        },
        {
            input: 'src/screenshot.ts',
            output: [
                {
                    file: 'dist/screenshot-ftw.cjs',
                    format: 'cjs',
                    sourcemap: true,
                },
            ],
            plugins,
        },
    ];
}

export default getConfig();
