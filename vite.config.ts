import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ['@bryntum/scheduler-enterprise', '@bryntum/scheduler-react-enterprise'],
    },
});