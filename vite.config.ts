/// <reference types="vitest" />
import { defineConfig } from 'vite'
import umdFormatResolver from 'vite-plugin-resolve-umd-format'

export default defineConfig({
  plugins: [umdFormatResolver()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'parseAttrs',
      formats: ['es', 'cjs', 'umd'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['json-loose', 'moo'],
      output: {
        globals: { 'json-loose': 'jsonLoose', moo: 'moo' }
      }
    }
  },
  test: {
    globals: true,
    include: ['test/*.test.ts']
  }
})
