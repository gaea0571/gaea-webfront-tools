import cors from "cors";
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
  await generate_entry();
  const server = express();
  const { proxy, devServer, webpackConfig, slave_application_list } = await load_config();
  const webpack_dev_config = await get_webpack_dev_config({ slave_application_list });
  const compose_webpack_config = merge(webpack_dev_config, webpackConfig);

  /** 配置反向代理 **/
  Object.keys(proxy).map((current_proxy_path) => {
    server.use(createProxyMiddleware(current_proxy_path, proxy[current_proxy_path]));
  });

  /** 获取webpack的编译对象 **/
  const compiler = webpack(compose_webpack_config);

  /** 开发资源支持跨域访问 **/
  server.use(cors());
  /** 单页应用刷新始终返回index.html,不出现404 **/
  server.use(history_fallback());
  /** webpack开发服务中间件 **/
  server.use(dev_middleware(compiler));
  /** 热更新socket.io中间件 **/
  server.use(hot_middleware(compiler));

  /** 查询子模块信息 **/
  server.get("/-/:namespace", (request, response) => {
    const { namespace } = request.params;
    if (namespace in slave_application_list) {
      response.send({ code: 200, data: true, message: "" });
    } else {
      response.send({ code: 404, data: false, message: "未查询到注册的随从" });
    };
  });

  server.listen(devServer.port, () => console.log("server is runing"));
})();
