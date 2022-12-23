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
      }
    }),
  ],
})
