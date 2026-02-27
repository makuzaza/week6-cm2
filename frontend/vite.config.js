import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://week6-cm2-iezp.onrender.com",
        changeOrigin: true,
      },
    },
  },
});