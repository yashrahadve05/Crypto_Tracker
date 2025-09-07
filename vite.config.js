import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { colors } from "@mui/material";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ["Montserrat", "sans-serif"],
            }
        },
    },
});
