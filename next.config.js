const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  pwa: {
    dest: "public",
    meta: {
      theme_color: "#18191b",
    },
  },
});
