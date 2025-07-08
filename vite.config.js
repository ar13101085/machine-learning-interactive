import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { componentTagger } from 'lovable-tagger'

export default defineConfig({
  plugins: [
    react(),
    componentTagger({
      // Enable component tagging in development
      enabled: process.env.NODE_ENV !== 'production',
      // Custom prefix for data attributes
      prefix: 'data-lovable',
      // Include source file info
      includeSource: true,
      // Include line numbers
      includeLineNumbers: true,
      // Exclude certain directories
      exclude: ['node_modules', '.git', 'dist', 'build'],
      // Include only specific file extensions
      include: ['**/*.jsx', '**/*.tsx'],
      // Enable verbose logging in development
      verbose: true
    })
  ],
})