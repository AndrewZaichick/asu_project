import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  html: { template: "./public/index.html" },
  source: {
    alias: {
      "@assets/*": ["./src/assets/*"],
      "@components/*": ["./src/components/*"],
      "@context/*": ["./src/context/*"],
      "@enums/*": ["./src/enums/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@interfaces/*": ["./src/interfaces/*"],
      "@pages/*": ["./src/pages/*"],
      "@router/*": ["./src/router/*"],
      "@scripts/*": ["./src/scripts/*"],
    },
  },
});
