import colors from "colors";
import prompt from "prompt";
import { promisify } from "util";

export default async () => {
  try {
    prompt.message = undefined;
    prompt.delimiter = ":";
    prompt.start();
    const { packageName } = await promisify(prompt.get)([{
      name: "packageName",
      required: true,
      message: colors.red("项目名称必须填写!"),
      description: colors.white("请输入项目名称")
    }]);
    return packageName;
  } catch (error) {
    if (error.message === "canceled") {
      process.exit(0);
    };
    throw error;
  };
};