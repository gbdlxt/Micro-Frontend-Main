/* eslint-disable */
const { name } = require("./package");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 8000;
module.exports = {
  devServer: {
    port,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${name}`,
    },
    externals: {
      // 'vue': 'Vue'
      // createApp: {
      //   root: [ 'vue', 'createApp' ]
      // }
    }
  },
};
