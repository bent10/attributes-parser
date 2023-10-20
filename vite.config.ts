/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
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
        globals: { 'json-loose': 'jsonLoose', moo: 'moo' },
        entryFileNames: '[name].[format].js'
      }
    }
  },
  test: {
    globals: true,
    include: ['test/*.test.ts']
  }
})
