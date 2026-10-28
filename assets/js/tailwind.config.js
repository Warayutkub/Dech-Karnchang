// Design tokens from the Figma "dad web" file (เดชการช่าง v2 · Style A — monochrome craftsman).
tailwind.config = {
  theme: {
    extend: {
      colors: {
        page: "#e6e8ea",
        panel: "#f5f6f7",
        ink: "#15181b",
        graphite: "#22262b",
        "graphite-2": "#30353b",
        muted: "#60676e",
        line: "#d3d7db",
        "on-dark": "#a9b0b7",
      },
      fontFamily: {
        sans: ['"Noto Sans Thai"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        panel: "32px",
        "panel-sm": "28px",
        card: "20px",
      },
      maxWidth: {
        site: "1392px",
      },
    },
  },
};
