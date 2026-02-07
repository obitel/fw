import type { Config } from "tailwindcss";

export default {
  content: ["./resources/js/**/*.{ts,tsx}", "./resources/views/**/*.blade.php", "./index.html"],
  theme: {
    extend: {
      colors: {
        base: "hsl(224 22% 8%)",
        surface: "hsl(222 18% 12%)",
        card: "hsl(222 20% 15%)",
        primary: "hsl(199 100% 55%)",
        accent: "hsl(282 90% 68%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(53, 205, 255, 0.25)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
