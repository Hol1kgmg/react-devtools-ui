import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: 'jsdom',
          globals: true,
          include: ["**/*.test.{ts,tsx}"],
          includeSource: ["**/*.{ts,tsx}"]
        },
      },
    ]
  }
});
