import inquirer from "inquirer";
import PROJECT_LIST from "@/configs/runtime.config";

export default async () => {
  const { template } = await inquirer.prompt({
    type: "list",
    name: "template",
    defaultValue: "dva-app",
    message: "选择拉取的项目脚手架:",
    choices: PROJECT_LIST
  });
  return template;
};