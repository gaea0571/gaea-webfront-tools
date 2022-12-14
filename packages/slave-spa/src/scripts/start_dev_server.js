import cors from "cors";
import axios from "axios";
import { URL } from "url";
import webpack from "webpack";
import express from "express";
import { merge } from "webpack-merge";
import hot_middleware from "webpack-hot-middleware";
import dev_middleware from "webpack-dev-middleware";
import history_fallback from "connect-history-api-fallback";
import { createProxyMiddleware } from "http-proxy-middleware";

import load_config from "@/utils/load_config";
import generate_entry from "@/utils/generate_entry";
import get_webpack_dev_config from "@/configs/webpack.dev.config";

(async () => {
  const { proxy, devServer, webpackConfig, ...otherAttr } = await load_config();
  const { version, namespace, master_provider } = otherAttr;

  /** 根据master配置决定生成什么样的入口文件 **/
  await generate_entry({ master_provider, namespace });

  /** 获取计算之后的webpack开发配置 **/
  const dev_webpack_config = await get_webpack_dev_config({ version, namespace, master_provider });
  /** 与开发者的配置文件进行合并 **/
  const compose_webpack_config = merge(dev_webpack_config, webpackConfig);

  const slave_provider_server = express();

  /** 配置反向代理 **/
  Object.keys(proxy).map((current_proxy_path) => {
    slave_provider_server.use(createProxyMiddleware(current_proxy_path, proxy[current_proxy_path]));
  });

  /** 获取webpack的编译对象 **/
  const compiler = webpack(compose_webpack_config);

  /** 开发资源支持跨域访问 **/
  slave_provider_server.use(cors());
  /** 单页应用刷新始终返回index.html,不出现404 **/
  slave_provider_server.use(history_fallback());
  /** webpack开发服务中间件 **/
  slave_provider_server.use(dev_middleware(compiler));
  /** 热更新socket.io中间件 **/
  slave_provider_server.use(hot_middleware(compiler));

  slave_provider_server.use(async (request, response, next) => {
    if (!master_provider) {
      return next();
    };
    try {
      const master_query_url = new URL(master_provider);
      master_query_url.pathname = `/-/${namespace}`;
      const { data } = await axios({
        method: "GET",
        url: format(master_query_url),
        responseType: "json"
      });
      if (data.code === 200) {
        return next();
      };
      if (data.code === 404) {
        return response.send(`<h1>${namespace}在${master_provider}上没有注册</h1>`);
      };
      return response.send(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
    } catch (error) {
      return response.send(`<pre>${JSON.stringify(error, null, 2)}</pre>`);
    }
  });

  slave_provider_server.listen(devServer.port, () => console.log("server is runing"));

})();