import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: "0.0.0.0", 
    allowedHosts: ["localhost", "127.0.0.1", "creatifytech.online"],
  },
});

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     host: true,
//     allowedHosts: ["workable-mastiff-credible.ngrok-free.app"],
//   },
// });

// vite.config.js
// export default {
//   server: {
//     allowedHosts: [
//       "serveo.net",
//       "creatify.serveo.net", // или конкретный адрес, если нужно
//     ],
//   },
// };
