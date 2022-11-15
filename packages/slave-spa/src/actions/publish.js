// import {Argument,Option} from "commander";
import fs from "fs";
import got from "got";
import glob from "glob";
import path from "path";
import { URL } from "url";
import { promisify } from "util";
import FormData from "formdata-node";

import load_config from "@/utils/load_config";

// export const test_command_argument=new Argument("<actions>","动作类型描述").choices(["init","info"]);
// export const test_command_option=new Option("-t,--test_option <string>").default("test_option_value");

export async function publish_command() {
  const { version, namespace, master_provider } = await load_config();
  const match_glob = path.resolve(process.cwd(), "./assets/**/*");
  const match_files = await promisify(glob)(match_glob, { nodir: true });

  const formdata = new FormData();

  const { origin } = new URL(master_provider);

  const publish_task = match_files.map(async (file_path) => {
    const basename = path.basename(file_path);
    const array_buffer = await promisify(fs.readFile)(file_path);
    formdata.set("file", array_buffer, basename);
    const data = await got.post(`${origin}/-/collection?version=${version}&namespace=${namespace}`, {
      body: formdata.stream,
      headers: formdata.headers
    });
    return data;
  });

  const result = await Promise.all(publish_task);

  console.log(result);
}