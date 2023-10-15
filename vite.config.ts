/// <reference types="vitest" />
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'parseAttrs',
      formats: ['es', 'cjs', 'umd'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['json-loose', 'moo'],
      output: { globals: { 'json-loose': 'jsonLoose', moo: 'moo' } }
    }
  },
  test: {
    globals: true,
    include: ['test/*.test.ts']
  }
})
