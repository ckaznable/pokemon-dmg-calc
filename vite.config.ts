import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "."),
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true
      },
      includeAssets: ["fav.png", "icons/calculator-192_x_192.png"],
      manifest: {
        name: 'Simple Pokemon DMG Calc',
        short_name: 'SP-DMG-C',
        description: 'Simple Pokemon DMG Calc',
        theme_color: '#121212',
        icons: [
          {
            src: 'icons/calculator-192_x_192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'fav.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'fav.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    }),
  ],
})
