import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  server: {
    host: true,        // allow network access
    allowedHosts: '56d9-2401-4900-8820-eb28-5d00-72a7-b656-7200.ngrok-free.app'
  }
})
