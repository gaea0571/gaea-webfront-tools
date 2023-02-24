import path from "path";
import { promisify } from "util";
import download from "download-git-repo";
import toast from "@cyber-tools/cli-utils/toast";

export default async ({ folderName, remote }) => {
  try {
    const downloadTemplate = `direct:${remote.replace(/\.git$/ig, "")}.git`;
    toast.start("正在拉取项目文件...");
    const projectPath = path.join(process.cwd(), folderName);
    await promisify(download)(downloadTemplate, projectPath, { clone: true });
    toast.succeed("拉取成功!");
  } catch (error) {
    toast.fail("拉取失败!");
    throw error;
  };
};