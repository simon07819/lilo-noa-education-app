/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sky: "#69C7FF",
        deepblue: "#2F80ED",
        purple: "#8B5CF6",
        pink: "#F472B6",
        greenbtn: "#8DD928",
        forest: "#4CAF50",
        orange: "#F59E0B",
        star: "#FFD93D",
        cream: "#FFF8E7",
        kidtext: "#27145C",
        candy: "#FF6B9D",
        gem: "#00D4AA",
        // Reference-inspired colors
        lavender: "#E8D5F5",
        softpink: "#FFE0EC",
        softblue: "#D6E8FF",
        softgreen: "#D4F5E2",
        softyellow: "#FFF3CD",
        gold: "#FFD700",
        warmpurple: "#7C5CBF",
        deeppurple: "#5B3E96",
      },
      fontFamily: {
        kid: ['"Nunito"', '"Baloo 2"', "sans-serif"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "28px",
        giant: "40px",
      },
      boxShadow: {
        kid: "0 6px 0 rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.1)",
        "kid-sm": "0 4px 0 rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)",
        glow: "0 0 30px rgba(255,217,61,0.5)",
        card: "0 8px 32px rgba(0,0,0,0.12)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        bounce: "bounce 2s ease-in-out infinite",
        wiggle: "wiggle 0.5s ease-in-out",
        pop: "pop 0.4s ease-out",
        sparkle: "sparkle 1.5s ease-in-out infinite",
        "confetti-fall": "confetti 3s ease-out forwards",
        shake: "shake 0.4s ease-in-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        pop: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        confetti: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(600px) rotate(720deg)", opacity: "0" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-8px)" },
          "40%": { transform: "translateX(8px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
        },
      },
    },
  },
  plugins: [],
};
