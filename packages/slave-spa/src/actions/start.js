import path from "path";
import chokidar from "chokidar";
import { fork } from "child_process";

const start_dev_server = path.resolve(__dirname, "../scripts/start_dev_server.js");

/** 启动本地开发服务 **/
export async function start_command() {
  const fork_task = [];

  fork_task.forEach((current_fork) => current_fork.kill());
  const child_process = fork(start_dev_server);
  fork_task.push(child_process);

  chokidar.watch(process.cwd(), {
    ignored: ["**/node_modules/**", "**/.framework/**"],
    ignoreInitial: true,
    persistent: true
  }).on("all", () => {
    fork_task.forEach((current_fork) => current_fork.kill());
    const child_process = fork(start_dev_server);
    fork_task.push(child_process);
  });
};