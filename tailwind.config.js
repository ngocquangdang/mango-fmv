/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        "pixel-orange": "#FF6B26",
        "pixel-yellow": "#FFCD4B",
        "pixel-shadow": "#E34D12",
        "pixel-border": "#1A1A1A",
      },
      fontFamily: {
        pixel: ['"VT323"', "monospace"],
      },
    },
  },
  plugins: [],
};

