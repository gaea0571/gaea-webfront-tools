import path from "path";
import { merge } from "webpack-merge";
import { DefinePlugin, HotModuleReplacementPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

import webpack_basic_config from "./webpack.basic.config";

export default ({ slave_application_list }) => {
  return merge(webpack_basic_config, {
    mode: "development",
    plugins: [
      new DefinePlugin({
        "process.env.slave_application_list": JSON.stringify(slave_application_list)
      }),
      new HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(process.cwd(), "./public/template.html")
      })
    ]
  })
}