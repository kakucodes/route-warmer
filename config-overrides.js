const webpack = require("webpack");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};

  Object.assign(fallback, {
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    crypto: require.resolve("crypto-browserify"),
    // "crypto-browserify": require.resolve("crypto-browserify"),
    // fs: false,
    // tls: false,
    // net: false,
    // path: false,
    // zlib: false,
    // http: false,
    // https: false,
    // stream: false,
    // crypto: false,
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  config.ignoreWarnings = [/Failed to parse source map/];

  return config;
};
