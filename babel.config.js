module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
        targets: {
          ie: "10",
        },
      },
    ],
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@vue/babel-plugin-transform-vue-jsx"
  ],
};

