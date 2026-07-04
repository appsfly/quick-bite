import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Safari drops the module MIME type on 304 Not Modified responses,
      // which breaks `<script type="module">` loading. Disable conditional
      // caching for dev so every request gets a fresh 200 with Content-Type.
      "Cache-Control": "no-store",
    },
  },
})
