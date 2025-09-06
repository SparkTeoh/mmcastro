/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      xs: "440px",
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1320px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        "text-default": "#024340",
        dark: "#000E30",
        light: "#024340",
        primary: "#024340",
        secondary: "#B4A180",
        accent: "#B4A180",
        body: "#fff",
        "border-default": "#E5E5E5",
        "theme-dark": "#024340",
        "theme-light": "#F9FBFF",
      },
      fontSize: {
        base: "16px",
        "base-sm": "15.2px",
        "base-xs": "12.8px", 
        h1: "4.2rem",
        "h1-md": "3.36rem",
        "h1-sm": "2.94rem",
        h2: "3.3rem",
        "h2-md": "2.64rem",
        "h2-sm": "2.31rem",
        h3: "2.5rem",
        "h3-md": "2rem",
        "h3-sm": "1.75rem",
        h4: "1.9rem",
        "h4-sm": "1.615rem",
        h5: "1.5rem",
        "h5-sm": "1.425rem",
        h6: "1.2rem",
      },
      lineHeight: {
        normal: "1.8",
        inherit: "inherit",
      },
      fontFamily: {
        primary: ['"DM Sans"', 'sans-serif'],
        secondary: ['Syne', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: "#E5E5E5",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}