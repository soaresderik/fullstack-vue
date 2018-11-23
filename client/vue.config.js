module.exports = {
  configureWebpack: {
    resolve: {
      // .mjs needed for Trilogy
      extensions: ["*", ".mjs", ".js", ".vue", ".json", ".ts"]
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        }
      ]
    }
  }
};
