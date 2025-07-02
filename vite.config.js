import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: '/tu-proyecto-react/', // <-- nombre del repositorio
  base: "https://profWilliamArte.github.io/themovie2025",
});
