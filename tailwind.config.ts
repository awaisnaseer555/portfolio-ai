import type { Config } from "tailwindcss";
const c = (v: string) => `rgb(var(--${v}) / <alpha-value>)`;
const KEYS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const scale = (...hex: string[]) => Object.fromEntries(KEYS.map((k, i) => [k, hex[i]]));

export default {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: { extend: {
    colors: {
      // Semantic tokens (switch with light/dark, defined in globals.css)
      bg: c("bg"), card: c("card"), fg: c("fg"), mute: c("mute"), line: c("line"), brand: c("brand"), accent: c("accent"), on: c("on"), plum: c("plum"),
      // Full palette scales (e.g. bg-french-blue-500)
      "deep-twilight": scale("#e6e7fe","#cecefd","#9c9efc","#6b6dfa","#393cf9","#080cf7","#0609c6","#050794","#030563","#020231","#010223"),
      "french-blue": scale("#e6f1ff","#cde2fe","#9bc5fd","#68a9fd","#368cfc","#046ffb","#0359c9","#024397","#022c64","#011632","#011023"),
      "bright-teal-blue": scale("#e5f6ff","#ccedff","#99dbff","#66c9ff","#33b8ff","#00a6ff","#0085cc","#006399","#004266","#002133","#001724"),
      "blue-green": scale("#e5f9ff","#ccf2ff","#99e6ff","#66d9ff","#33ccff","#00bfff","#0099cc","#007399","#004d66","#002633","#001b24"),
      "turquoise-surf": scale("#e5fbff","#ccf6ff","#99eeff","#66e5ff","#33ddff","#00d4ff","#00aacc","#007f99","#005566","#002a33","#001e24"),
      "sky-aqua": scale("#e9f9fc","#d3f2f8","#a6e5f2","#7ad8eb","#4ecbe4","#21bede","#1b98b1","#147285","#0d4c59","#07262c","#051b1f"),
      "frosted-blue": scale("#e9f9fc","#d2f2f9","#a5e6f3","#78d9ed","#4bcde7","#1fc0e0","#189ab4","#127387","#0c4d5a","#06262d","#041b1f"),
      "light-cyan": scale("#e8f9fc","#d2f3f9","#a5e6f3","#78daed","#4acde8","#1dc1e2","#179ab5","#127487","#0c4d5a","#06272d","#041b20"),
    },
    fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"], mono: ["var(--font-mono)", "ui-monospace", "monospace"] },
  } },
  plugins: [],
} satisfies Config;
