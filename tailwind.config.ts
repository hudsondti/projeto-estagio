/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: {
    pattern: /^(bg|to|from)-/,
  },
  theme: {
    container: {
      center: true,
    },
    colors: {
      bgColor: "var(--bg-color)",
      text: "var(--text)",
      "text-white": "var(--text-white)",
      primary: {
        500: "var(--primary-500)",
        400: "var(--primary-400)",
        300: "var(--primary-300)",
        200: "var(--primary-200)",
        100: "var(--primary-100)",
        dark: "var(--primary-dark)",
        light: "var(--primary-light)",
        shade: "var(--primary-shade)",
      },
      highlight: {
        primary: "var(--highlight-primary)",
        secondary: "var(--highlight-secondary)",
        terciary: "var(--highlight-terciary)",
      },
      gray: {
        500: "#010B0C",
        400: "#4F4F4F",
        300: "#B0B0B0",
        200: "#E7E7E7",
        100: "#F4F4F4",
      },
      secondary: {
        500: "var(--secondary-500)",
        400: "var(--secondary-400)",
        300: "var(--secondary-300)",
        200: "var(--secondary-200)",
        100: "var(--secondary-100)",
        dark: "var(--secondary-dark)",
      },

      transparent: "rgba(0, 0, 0, 0)",
      turquoise_100: "#33B4C4",
      turquoise_75: "#6CC2CB",
      turquoise_60: "#B0DEE3",
      turquoise_45: "#B0DEE3",
      turquoise_30: "#D0EBEE",
      turquoise_15: "#F1FAFA",
      turquoise_hover: "#1098AA",
      turquoise_inactive: "#B6DDE1",
      turquoise_pressed: "#15798B",
      blue_100: "#2055A6",
      blue_75: "#5E84BF",
      blue_60: "#83A0CD",
      blue_45: "#A8BDDC",
      blue_30: "#CBD8EA",
      blue_15: "#F0F4F9",
      purple_100: "#534293",
      purple_75: "#9491C1",
      purple_60: "#8D8BBE",
      purple_45: "#B4B2D4",
      purple_30: "#D2D1E5",
      purple_15: "#F2F2F8",
      black_100: "#000000",
      black_75: "#474747",
      black_60: "#717171",
      black_45: "#9C9C9C",
      black_30: "#C4C4C4",
      black_15: "#EEEEEE",
      black_05: "#F5F5F5",
      black_opacity_75: "rgba(25, 25, 25, 0.75)",
      gray_100: "#404040",
      gray_80: "#727272",
      gray_20: "#E7E7E7",
      gray_10: "#F5F5F5",
      rose_100: "#E31C79",
      rose_75: "#EB5B9E",
      rose_60: "#EF81B4",
      rose_45: "#F4A7CB",
      rose_30: "#F9CAE0",
      rose_15: "#FDF0F7",
      orange_100: "#F06400",
      orange_75: "#F48F47",
      orange_60: "#F7A971",
      orange_45: "#F9C39C",
      orange_30: "#FCDBC4",
      orange_15: "#FEF5EF",
      olive_100: "#A8C700",
      olive_75: "#C0D747",
      olive_60: "#CFE071",
      olive_45: "#DDE99C",
      olive_30: "#EBF2C4",
      olive_15: "#FAFBEF",
      white_100: "#FFFFFF",
      white_hover: "#E6E6E6",
      white_inactive: "#B6DDE1",
      white_pressed: "#DCDCDC",
      bg_dti_evolve: "#282828",
    },
    fontFamily: {
      sans: ["Red Hat Text", "sans-serif"],
      title: ["Red Hat Display", "sans-serif"],
    },
    fontSize: {
      display_lg_semibold: [
        "3rem",
        {
          fontWeight: 600,
          lineHeight: "72px",
        },
      ],
      display_lg_medium: [
        "3rem",
        {
          fontWeight: 500,
          lineHeight: "72px",
        },
      ],
      display_lg_regular: [
        "3rem",
        {
          fontWeight: 400,
          lineHeight: "72px",
        },
      ],
      display_title_md_semibold: [
        "2.25rem",
        {
          fontWeight: 600,
          lineHeight: "40px",
        },
      ],
      display_md_semibold: [
        "2rem",
        {
          fontWeight: 600,
          lineHeight: "40px",
        },
      ],
      display_md_medium: [
        "2.25rem",
        {
          fontWeight: 500,
          lineHeight: "44px",
        },
      ],
      display_md_regular: [
        "2.25rem",
        {
          fontWeight: 400,
          lineHeight: "44px",
        },
      ],
      display_sm_semibold: [
        "2rem",
        {
          fontWeight: 600,
          lineHeight: "40px",
        },
      ],
      display_sm_medium: [
        "2rem",
        {
          fontWeight: 500,
          lineHeight: "40px",
        },
      ],
      display_sm_regular: [
        "2rem",
        {
          fontWeight: 400,
          lineHeight: "40px",
        },
      ],
      display_subtitle_lg_semibold: [
        "1.25rem",
        {
          fontWeight: 600,
          lineHeight: "30px",
        },
      ],
      display_subtitle_lg_semibold500: [
        "1.25rem",
        {
          fontWeight: 500,
          lineHeight: "30px",
        },
      ],
      title_xlg_semibold: [
        "48px",
        {
          fontWeight: 600,
          lineHeight: "72px",
        },
      ],
      title_xlg_medium: [
        "48px",
        {
          fontWeight: 500,
          lineHeight: "72px",
        },
      ],
      title_xlg_regular: [
        "48px",
        {
          fontWeight: 400,
          lineHeight: "72px",
        },
      ],
      title_lg_semibold: [
        "36px",
        {
          fontWeight: 600,
          lineHeight: "44px",
        },
      ],
      title_lg_medium: [
        "36px",
        {
          fontWeight: 500,
          lineHeight: "44px",
        },
      ],
      title_lg_regular: [
        "36px",
        {
          fontWeight: 400,
          lineHeight: "44px",
        },
      ],
      title_md_semibold: [
        "32px",
        {
          fontWeight: 600,
          lineHeight: "40px",
        },
      ],
      title_md_medium: [
        "32px",
        {
          fontWeight: 500,
          lineHeight: "40px",
        },
      ],
      title_md_regular: [
        "32px",
        {
          fontWeight: 400,
          lineHeight: "40px",
        },
      ],
      title_sm_semibold: [
        "24px",
        {
          fontWeight: 600,
          lineHeight: "32px",
        },
      ],
      title_sm_medium: [
        "24px",
        {
          fontWeight: 500,
          lineHeight: "32px",
        },
      ],
      title_sm_regular: [
        "24px",
        {
          fontWeight: 400,
          lineHeight: "32px",
        },
      ],
      subtitle_lg_semibold: [
        "1.25rem",
        {
          fontWeight: 600,
          lineHeight: "30px",
        },
      ],
      subtitle_lg_medium: [
        "1.25rem",
        {
          fontWeight: 500,
          lineHeight: "30px",
        },
      ],
      subtitle_lg_regular: [
        "1.25rem",
        {
          fontWeight: 400,
          lineHeight: "30px",
        },
      ],
      subtitle_sm_semibold: [
        "1rem",
        {
          fontWeight: 600,
          lineHeight: "24px",
        },
      ],
      subtitle_sm_medium: [
        "1rem",
        {
          fontWeight: 500,
          lineHeight: "24px",
        },
      ],
      subtitle_sm_regular: [
        "1rem",
        {
          fontWeight: 400,
          lineHeight: "24px",
        },
      ],
      body_lg_semibold: [
        "0.875rem",
        {
          fontWeight: 600,
          lineHeight: "20px",
        },
      ],
      body_lg_medium: [
        "0.875rem",
        {
          fontWeight: 500,
          lineHeight: "20px",
        },
      ],
      body_lg_regular: [
        "0.875rem",
        {
          fontWeight: 400,
          lineHeight: "20px",
        },
      ],
      body_md_semibold: [
        "0.75rem",
        {
          fontWeight: 600,
          lineHeight: "16px",
        },
      ],
      body_md_medium: [
        "0.75rem",
        {
          fontWeight: 500,
          lineHeight: "16px",
        },
      ],
      body_md_regular: [
        "0.75rem",
        {
          fontWeight: 400,
          lineHeight: "20px",
        },
      ],
      body_sm_semibold: [
        "0.625rem",
        {
          fontWeight: 600,
          lineHeight: "16px",
        },
      ],
      body_sm_medium: [
        "0.625rem",
        {
          fontWeight: 500,
          lineHeight: "16px",
        },
      ],
      body_sm_regular: [
        "0.625rem",
        {
          fontWeight: 400,
          lineHeight: "16px",
        },
      ],
      //   body_md_regular: [
      //     "0.75rem",
      //     {
      //       fontWeight: 400,
      //       lineHeight: "16px",
      //     },
      //   ],
      // ======================================================================================== //
      poppins_90: [
        "5.625rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_60: [
        "3.75rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_50: [
        "3.125rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_48: [
        "3rem",
        {
          fontWeight: "400",
          lineHeight: "110%",
        },
      ],
      poppins_40: [
        "2.5rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_38: [
        "2.375rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_36: [
        "2.25rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_32: [
        "2.0rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_30: [
        "1.875rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_28: [
        "1.75rem",
        {
          fontWeight: "500",
          lineHeight: "110%",
        },
      ],
      poppins_26: [
        "1.625rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_25: [
        "1.563rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_24: [
        "1.5rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_22: [
        "1.375rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_20: [
        "1.25rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_18: [
        "1.125rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_16: [
        "1rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_14: [
        "0.875rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_12: [
        "0.75rem",
        {
          fontWeight: "500",
        },
      ],
      poppins_10: ["0.625rem"],
    },
    extend: {
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      boxShadow: {
        "glow-sm": "1.25px 1.25px 16px 0px #33B4C4",
        "glow-md": "2px 2px 16px 0px #33B4C4",
        "inner-border-turquoise": "inset 0px 0px 0px 2px var(--primary-dark)",
        "inner-border-turquoise-hover":
          "inset 0px 0px 0px 2px var(--primary-400)",
        "inner-border-turquoise-light":
          "inset 0px 0px 0px 2px var(--primary-light)",
        "inner-border-turquoise-light-hover":
          "inset 0px 0px 0px 2px var(--primary-400)",
        "inner-border-white": "inset 0px 0px 0px 2px var(--gray-100)",
        "inner-border-white-hover": "inset 0px 0px 0px 2px var(--gray-300)",
      },
      animation: {
        "check-anime": "checkAnime 0.5s 1",
      },
      backgroundSize: {
        "size-underline-animation": "100% 1px",
      },
      backgroundPosition: {
        "position-underline-animation": "0 100%",
      },
      screens: {
        sm: "640px",
        hmobile: "1140px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xl1: "1368px",
        xl2: "1440px",
        xl3: "1660px",
        xl4: "1920px",
        xl5: "2400px",
      },
      gridTemplateRows: {
        2: "repeat(2, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
      },
      gridTemplateColumns: {
        reverseColumns: "1fr 1fr",
        cardsSoluctions: "auto auto auto",
        caseContent: "0.7fr 1fr",
        starSection: "2fr auto",
        sing_blog_grid: "220px minmax(696px, 760px) 1fr",
      },
    },
  },

  plugins: [],
};
