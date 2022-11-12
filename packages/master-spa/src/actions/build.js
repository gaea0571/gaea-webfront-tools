// import {Argument,Option} from "commander";
import webpack from "webpack";
import { merge } from "webpack-merge";
import load_config from "@/utils/load_config";
import generate_entry from "@/utils/generate_entry";

import get_webpack_build_config from "@/configs/webpack.build.config";
// export const test_command_argument=new Argument("<actions>","动作类型描述").choices(["init","info"]);
// export const test_command_option=new Option("-t,--test_option <string>").default("test_option_value");

export async function build_command() {
  await generate_entry();
  const { webpackConfig, slave_application_list } = await load_config();
  const webpack_build_config = await get_webpack_build_config({ slave_application_list });
  const compose_webpack_config = merge(webpack_build_config, webpackConfig);

  /** 获取webpack的编译对象 **/
  const compiler = await new Promise((resolve, reject) => {
    webpack(compose_webpack_config, (error, result) => {
      error ? reject(error) : resolve(result);
    });
  });
  const build_result = compiler.toString({ colors: true });
  console.log(build_result);
}