import { version, description } from "@@/package.json";
import { ArgumentParser } from "argparse";

const parser = new ArgumentParser({
  description: description
});

parser.add_argument("-v", "--version", { action: "version", version });
parser.add_argument("-f", "--file", { help: "指定运行时配置文件" });

export default parser.parse_args();