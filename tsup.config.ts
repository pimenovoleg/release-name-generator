import { defineConfig } from 'tsup';

export default defineConfig({
    clean: true,
    dts: true,
    entry: ['src/main.ts'],
    format: ['esm'],
    sourcemap: true,
    target: 'esnext',
    outDir: 'dist'
});
