import fs from "fs";
import ejs from "ejs";
import path from "path";
import { promisify } from "util";
import { URL, format } from "url";
import { merge } from "webpack-merge";
import { HotModuleReplacementPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import webpack_basic_config from "./webpack.basic.config";

const no_master_html_template = path.resolve(__dirname, "../../templates/no_master_html_template.ejs");
const with_master_html_template = path.resolve(__dirname, "../../templates/with_master_html_template.ejs");

export default async ({ version, namespace, master_provider }) => {

  /** 基础的webpack配置 **/
  const basic_config = webpack_basic_config({ version, namespace, master_provider });

  const no_master_html_template_content = await promisify(fs.readFile)(no_master_html_template, "utf-8");
  const with_master_html_template_content = await promisify(fs.readFile)(with_master_html_template, "utf-8");

  /** 
   * 开发模式下增加热更新 
   * 和html渲染入口
   * **/
  return merge(basic_config, {
    mode: "development",
    plugins: [
      new MiniCssExtractPlugin({
        runtime: true,
        linkType: "text/css",
        filename: `application.[fullhash].css`
      }),
      new HotModuleReplacementPlugin(),
      master_provider ? (() => {
        const master_baisc_url = new URL(master_provider);
        master_baisc_url.pathname = namespace;
        return new HtmlWebpackPlugin({
          inject: false,
          templateContent: ejs.render(with_master_html_template_content, {
            namespace,
            master_dev_url_link: format(master_baisc_url)
          })
        })
      })() : (
        new HtmlWebpackPlugin({
          templateContent: ejs.render(no_master_html_template_content, {
            namespace
          })
        })
      )
    ]
  });
}