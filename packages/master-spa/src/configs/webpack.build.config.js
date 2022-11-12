import path from "path";
import { DefinePlugin } from "webpack";
import { merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import webpack_basic_config from "./webpack.basic.config";

export default ({ slave_application_list }) => {
  return merge(webpack_basic_config, {
    mode: "production",
    output: {
      clean: true,
      path: path.resolve(process.cwd(), "./assets/"),
      filename: `index.[fullhash].js`
    },
    plugins: [
      new DefinePlugin({
        "process.env.slave_application_list": JSON.stringify(slave_application_list)
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(process.cwd(), "./public/template.html")
      }),
      new MiniCssExtractPlugin({
        runtime: true,
        linkType: "text/css",
        filename: `index.[fullhash].css`
      }),
    ]
  })
}