import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const assetName = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', assetName)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),

    // Os plugins React e Tailwind são necessários para o Make
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],
})
