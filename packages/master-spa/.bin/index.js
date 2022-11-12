#!/usr/bin/env node
const path=require("path");
require("@babel/register")({
  cache:true,
  cwd:path.resolve(__dirname,"../"),
  presets: [ 
    require.resolve("@babel/preset-env")
  ],
  plugins:[
    [require.resolve("@babel/plugin-transform-runtime")],
    [require.resolve("babel-plugin-module-resolver"), {
      root: [path.resolve(__dirname,"../src/")],
      alias: {
        "@": path.resolve(__dirname,"../src/"),
        "@@": path.resolve(__dirname,"../")
      }
    }]
  ]
});
require("@cyber-tools/cli-utils/initial");
require("../src/main");