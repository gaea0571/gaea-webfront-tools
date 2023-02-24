import { program } from "commander";
import { name, version } from "@@/package.json";

import { start_command } from "@/actions/start";
import { build_command } from "@/actions/build";
import { publish_command } from "@/actions/publish";


program
  .usage(name)
  .version(version)

program
  .command("start")
  .description("启动开发服务")
  .action(start_command);

program
  .command("build")
  .description("本地打包命令")
  .action(build_command);

program
  .command("publish")
  .description("发布到服务器")
  .action(publish_command);

program.parse();