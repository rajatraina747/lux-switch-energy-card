import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/lux-switch-energy-card.ts'),
            name: 'LuxSwitchEnergyCard',
            fileName: (format) => 'lux-switch-energy-card.js',
            formats: ['es']
        },
        outDir: 'dist',
        rollupOptions: {
            external: [], // bundle lit into the file so it's standalone? Or keep it external? Usually custom cards bundle everything.
        }
    }
});
