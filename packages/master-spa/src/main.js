import { program } from "commander";
import { name, version } from "@@/package.json";

import { pick_command } from "@/actions/pick";
import { start_command } from "@/actions/start";
import { build_command } from "@/actions/build";


program
  .usage(name)
  .version(version);

program
  .command("pick")
  .description("发布到服务器")
  .action(pick_command);

program
  .command("start")
  .description("启动开发服务")
  .action(start_command);

program
  .command("build")
  .description("本地打包命令")
  .action(build_command);

program.parse();