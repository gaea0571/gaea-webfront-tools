// import {Argument,Option} from "commander";
import fs from "fs";
import path from "path";
import multer from "multer";
import express from "express";
import { promisify } from "util";
import history_fallback from "connect-history-api-fallback";
import { createProxyMiddleware } from "http-proxy-middleware";

import load_config from "@/utils/load_config";

// export const test_command_argument=new Argument("<actions>","动作类型描述").choices(["init","info"]);
// export const test_command_option=new Option("-t,--test_option <string>").default("test_option_value");

export async function pick_command() {

  const { proxy } = await load_config();

  const app = express();

  const upload = multer({
    storage: multer.memoryStorage()
  });

  /** 单页应用刷新始终返回index.html,不出现404 **/
  app.use(history_fallback());

  /** 配置反向代理 **/
  Object.keys(proxy).map((current_proxy_path) => {
    server.use(createProxyMiddleware(current_proxy_path, proxy[current_proxy_path]));
  });

  /** 提供其余的静态资源 **/
  app.use(express.static(path.resolve(process.cwd(), "./assets/")));
  app.use(express.static(path.resolve(process.cwd(), "./modules/")));

  /** 静态资源收集接口 **/
  app.post("/-/collection", upload.single("file"), async (request, reponse) => {
    try {
      const { namespace, version } = request.query;
      const { buffer, originalname } = request.file;
      const save_dir_path = path.resolve(process.cwd(), ["modules", namespace, version].join("/"));
      const save_file_path = path.resolve(save_dir_path, originalname);
      await promisify(fs.mkdir)(save_dir_path, { recursive: true });
      await promisify(fs.writeFile)(save_file_path, buffer);
      reponse.send({ code: 200, data: "ok", message: "save complate" });
    } catch (error) {
      reponse.send({ code: 1000, data: null, message: error.message });
    };
  });

  app.listen(18500, () => {
    console.log("server is runing port 18500");
  });

};