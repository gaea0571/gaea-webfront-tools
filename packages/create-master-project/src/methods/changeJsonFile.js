import ora from "ora";
import path from "path";
import { promisify } from "util";
import { readFile, writeFile } from "jsonfile";


export default async ({ folderName, projectName, devDependencies }) => {
  const toast = ora();
  try {
    toast.start("修改package.json");
    const jsonFilePath = path.resolve(process.cwd(), folderName, "./package.json");
    const jsonObject = await promisify(readFile)(jsonFilePath);
    const rewriteJsonObject = Object.assign({}, jsonObject, {
      name: projectName,
      devDependencies: Object.assign({}, jsonObject.devDependencies, devDependencies)
    });
    await promisify(writeFile)(jsonFilePath, rewriteJsonObject, { spaces: 2, EOL: '\r\n' });
    toast.succeed("package.json修改成功!");
  } catch (error) {
    toast.fail("package.json修改失败!");
    throw error;
  };
};