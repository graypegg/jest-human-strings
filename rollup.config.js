// noinspection JSUnusedGlobalSymbols

import pkg from './package.json' assert { type: "json" };
import typescript from "@rollup/plugin-typescript";

export default [
    {
        input: 'src/main.ts',
        external: ['ms'],
        plugins: [typescript()],
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' }
        ]
    }
];